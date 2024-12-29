import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { generateReport } from '@src/services/adsense.service';
import { auth } from '../../../../../lib/auth';
import { prisma } from '../../../../../prisma/client';

export async function POST(req: NextRequest) {
  const dateRange = await req.json();
  const userId = (await auth())?.userId;
  const accessToken = (await auth())?.access_token;

  if (!accessToken)
    return NextResponse.json({
      message: '접근 권한이 없습니다. 로그인 후 시도해주세요.',
    });

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const accountName = await getAccountInfoWithDb(userId);
    if (!accountName)
      return NextResponse.json({
        message: '접근 권한이 없습니다. 우측 상단에 보이는 [Adsense] 계정 요청 후 다시시도 해주세요.',
      });
    const reports = await generateReport(accountName, auth, dateRange);

    return NextResponse.json(reports, { status: 201 });
  } catch (error) {
    console.error('/api/adsense', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500, statusText: '네트워크 에러' });
  }
}

async function getAccountInfoWithDb(userId?: string) {
  if (!userId) return false;
  try {
    const accountInfo = await prisma.adsenseAccount.findFirst({
      select: { accountId: true },
      where: { userId: userId },
    });

    return accountInfo?.accountId;
  } catch (error) {
    console.error('/api/adsense/reports', error);
    return false;
  }
}
