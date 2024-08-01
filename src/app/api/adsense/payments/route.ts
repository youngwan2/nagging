import { NextRequest, NextResponse } from 'next/server';
import prisma from '@src/../prisma/client';
import { getCredentials, getPayments } from '../../../../../lib/adsense';
import { adsense_v2 } from 'googleapis';

export async function POST(req: NextRequest) {
  const userId = JSON.parse(await req.text()).userId;
  const raw = req.headers.get('Authorization')?.split(' ') || '';
  const accessToken = raw[1];

  // 토큰 형식이 불일치 하면 요청을 거절
  if (raw[0] !== 'Bearer' || userId.length < 2) {
    return NextResponse.json(
      { error: '유효한 요청 양식이 아님.' },
      { status: 401, statusText: '유효한 요청 양식이 아님' },
    );
  }

  // 애드센스 계정 정보를 조회
  try {
    const accountName = await prisma.adsenseAccount.findMany({
      where: { userId },
      select: { accountId: true },
    });

    // 계정 정보가 없다면 요청을 거절
    if (accountName.length < 1) {
      return NextResponse.json(
        { error: '계정 정보 없음. 애드센스 재요청 후 다시 요청 바람' },
        { status: 404, statusText: '계정 정보 없음' },
      );
    }

    // 기존의 수익금이 존재하는지에 따라서 요청을 분기처리.
    const dbPayments = (await getPaymentsFromDB(userId)) || { paid: [] };

    if (dbPayments.length < 1) {
      // 자격증명을 발급 받고, 수익금을 조회
      const auth = await getCredentials(accessToken);
      const payments =
        ((await getPayments(
          accountName[0].accountId,
          auth,
        )) as adsense_v2.Schema$Payment[]) || [];

      // 수익금을 데이터베이스에 저장
      setPayment(userId, [JSON.stringify(payments) as string]);

      // 수익금 내역이 없으면 없다는 응답을 보내고, 있다면 조회된 내역을 응답
      if (payments && payments?.length < 1)
        return NextResponse.json(
          { error: '결제 내역 없음.' },
          { status: 404, statusText: '결제 내역 없음' },
        );
      else {
        return NextResponse.json({ payments: payments });
      }

      // 기존 데이터베이스에 저장된 정보로 응답
    } else {
      return NextResponse.json({ payments: JSON.parse(dbPayments[0].paid[0]) });
    }
  } catch (error) {
    console.error('/api/adsense/payments', error);
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
}

async function getPaymentsFromDB(userId: string) {
  try {
    const paid = await prisma.adsensePayment.findMany({
      where: { userId },
      select: {
        paid: true,
      },
    });
    return paid;
  } catch (error) {
    throw new Error('애드센스 지급 데이터 데이터베이스 조회 실패');
  }
}

async function setPayment(userId: string, paid: string[]) {
  try {
    await prisma.adsensePayment.create({
      data: {
        userId,
        paid,
      },
    });
  } catch (error) {
    throw new Error('애드센스 지급 데이터 구글 요청 실패');
  }
}
