import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@src/../prisma/client';
import { connect } from '../../../../../lib/prisma/client';
import { adsense_v2 } from 'googleapis';
import { getCredentials, getPayments } from '@src/services/adsense.service';

export async function POST(req: NextRequest) {
  const { prisma, close } = await connect();
  const userId = JSON.parse(await req.text()).userId;
  const raw = req.headers.get('Authorization')?.split(' ') || '';
  const accessToken = raw[1];

  // 토큰 형식이 불일치 하면 요청을 거절
  if (raw[0] !== 'Bearer' || userId.length < 2) {
    return NextResponse.json({ message: '유효한 요청 양식이 아님.' });
  }

  // 애드센스 계정 정보를 조회
  try {
    const accountName = await prisma.adsenseAccount.findMany({
      where: { userId },
      select: { accountId: true },
    });

    // 계정 정보가 없다면 요청을 거절
    if (accountName.length < 1) {
      return NextResponse.json({
        message: '계정 정보 없음. 애드센스 재요청 후 다시 요청 바람',
      });
    }

    const dbPayments = await getDbPayment(userId);

    /** 기존 DB에 저장된 수익금(지불) 정보가 있는 경우  */
    if (dbPayments) {
      const { paid, updatedAt } = dbPayments;
      const isUpdate = hasOneMonthPassed(updatedAt);

      // 기존에 존재하는 지불 내역이 과거라면 새로운 데이터로 업데이트
      if (isUpdate) {
        // 수익금(지불) 금액을 애드센스로 부터 요청
        const payments = await getNewPayment(accessToken, accountName);
        // 수익금을 데이터베이스에 저장
        setPayment(userId, [JSON.stringify(payments) as string]);

        return NextResponse.json({ payments: payments });
      } else {
        const parsePaid = JSON.parse(paid[0]);
        return NextResponse.json({ payments: parsePaid });
      }

      /** 기존 DB에 저장된 수익금(지불) 정보가 없는 경우  */
    } else {
      // 수익금(지불) 금액을 애드센스로 부터 요청
      const payments = await getNewPayment(accessToken, accountName);

      // 수익금을 데이터베이스에 저장
      setPayment(userId, [JSON.stringify(payments) as string]);

      // 수익금 내역이 없으면 없다는 응답을 보내고, 있다면 조회된 내역을 응답
      if (payments && payments?.length < 1) return NextResponse.json({ message: '결제 내역 없음.' });
      else {
        return NextResponse.json({ payments: payments });
      }
    }
  } catch (error) {
    console.error('/api/adsense/payments', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500, statusText: '네트워크 에러' });
  } finally {
    await close();
  }
}

/** 수익금(지불) 데이터베이스 저장 */
async function setPayment(userId: string, paid: string[]) {
  const { prisma, close } = await connect();
  try {
    await prisma.adsensePayment.create({
      data: {
        userId,
        paid,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('애드센스 지급 데이터 구글 요청 실패');
  } finally {
    await close();
  }
}
/**
 * 유저 별 수익금(지불) 금액 DB 조회
 * @param userId 유저 식별을 위한 ID
 */
async function getDbPayment(userId: string) {
  const { prisma, close } = await connect();
  try {
    const paymentInfo = (await prisma.adsensePayment.findFirst({
      select: {
        paid: true,
        updatedAt: true,
      },
      where: { userId },
    })) || { paid: [''], updatedAt: 0 };

    if (paymentInfo.updatedAt === 0) return false;

    return paymentInfo;
  } catch (error) {
    console.error(error);
    throw new Error('페이먼트 조회실패');
  } finally {
    await close();
  }
}

/**
 * 구글 애드센스로 부터 새로운 수익금 정보를 불러온다.
 * @param accessToken 구글 로그인 자격증명을 위한 검증용 토큰
 * @param accountName 사용자 애드센스 계정 아이디
 */
async function getNewPayment(accessToken: string, accountName: { accountId: string | null }[]) {
  // 자격증명을 발급 받고, 수익금을 조회
  const oauth = await getCredentials(accessToken);
  if (!oauth) throw new Error('인증된 유저가 아님');

  const payments = ((await getPayments(accountName[0].accountId, oauth)) as adsense_v2.Schema$Payment[]) || [];

  return payments;
}

/** 지불 받은 날로 부터 한 달 지났니? 같은 달이면 0, 서로 다른 달리면 1이상이 나오므로 이를 기점으로 판별 */
function hasOneMonthPassed(updatedAt: Date | number) {
  const currentDate = new Date();
  return currentDate.getMonth() - new Date(updatedAt).getMonth() >= 1;
}
