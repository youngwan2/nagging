import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import {
  ReportRequest,
  generateReport,
  getAccountInfo,
} from '@src/../lib/adsense';

export async function GET(req: NextRequest) {
  const startYear = req.headers.get('start-year')!;
  const startMonth = req.headers.get('start-month')!;
  const startDay = req.headers.get('start-day')!;
  const endYeaer = req.headers.get('end-year')!;
  const endMonth = req.headers.get('end-month')!;
  const endDay = req.headers.get('end-day')!;

  // 보고서 조회 필터
  const dateRange: ReportRequest = {
    dateRange: 'CUSTOM',
    dimensions: ['MONTH'],
    endDate: {
      day: parseInt(endDay),
      month: parseInt(endMonth),
      year: parseInt(endYeaer),
    },
    metrics: ['ESTIMATED_EARNINGS'],
    reportingTimeZone: 'ACCOUNT_TIME_ZONE',
    startDate: {
      day: parseInt(startDay),
      month: parseInt(startMonth),
      year: parseInt(startYear),
    },
  };

  const accessToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken)
    return NextResponse.json(
      { error: 'Access Token 없음' },
      { status: 401, statusText: 'Access Token 없음' },
    );

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const accountName = await getAccountInfo(auth);

    const reports = generateReport(accountName, auth, dateRange);

    console.log('보고서:', reports);
  } catch (error) {
    console.error('/api/adsense', error);
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
}
