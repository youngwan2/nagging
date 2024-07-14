import { auth } from '@src/auth';
import { NextResponse } from 'next/server';
import {
  getAccountInfo,
  getCredentials,
  saveAccountName,
} from '@src/../lib/adsense';
import prisma from '@src/../prisma/client';

// memo: https://authjs.dev/getting-started/session-management/protecting#api-routes 에서 next-auth 래퍼 참조
export const POST = auth(async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Access Token 없음' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1].trim();
    const { userId } = (await req.json()) as { userId: string };

    if (!accessToken) {
      return NextResponse.json({ error: 'Access Token 없음' }, { status: 401 });
    }

    // 저장된 애드센스 계정이 있는지 확인하고, 있으면 불러옵니다.
    const dbAccountName = await prisma.adsenseAccount.findMany({
      select: { accountId: true },
      where: { userId },
    });

    // 구글 로그인으로 받은 accessToken을 사용해서 애드센스 자격증명을 확인합니다.
    const auth = await getCredentials(accessToken);

    // 기존 계정이 있으면 불러오고, 없으면 새로 요청해서 불러옵니다.
    const accountName =
      (dbAccountName.length > 0
        ? dbAccountName[0].accountId
        : await getAccountInfo(auth)
      )?.toString() ?? '';

    // 새로 불러온 계정의 경우 데이터베이스에 저장합니다.
    if (dbAccountName.length < 1) {
      console.log('새로운 계정 확인 로그');
      await saveAccountName(accountName, userId, prisma);
    }

    return NextResponse.json({ accountName, status: 200, statusText: '성공' });
  } catch (error) {
    console.error('/api/adsense', error);
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
});
