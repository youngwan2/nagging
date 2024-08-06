import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { generateReport, getAccountInfo } from '@src/services/adsense.service';

export async function POST(req: NextRequest) {
  const dateRange = await req.json();
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken)
    return NextResponse.json(
      { error: '접근 권한이 없음' },
      { status: 401, statusText: '접근권한이 없음' },
    );

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const accountName = await getAccountInfo(auth);
    const reports = await generateReport(accountName, auth, dateRange);

    return NextResponse.json(reports, { status: 201 });
  } catch (error) {
    console.error('/api/adsense', error);
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
}
