import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../../lib/auth';
import { Session } from 'next-auth';
import { getReportOptionFromDb, sendNotification } from '@src/task';

export async function POST(req: NextRequest, { params }: { params: Promise<{ reportId: string }> }) {
  const reportId = Number((await params).reportId);

  try {
    const {
      userId,
      access_token: accessToken = '',
      user,
    } = ((await auth()) as Session) || { userId: '', accessToken: '' };
    const userEmail = user?.email || '';

    // 로그인 유저인지 확인
    if (!userId || !user) return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 401 });

    const reportOptionJSON = await getReportOptionFromDb(reportId, userId);

    if (!reportOptionJSON) {
      return NextResponse.json({ error: '등록된 보고서 옵션이 아닙니다.' });
    }

    await sendNotification(userId, reportOptionJSON, accessToken, userEmail);
    return NextResponse.json({ message: '즉시 보고서 전송 완료' });
  } catch (error) {
    console.error('작업등록 실패:', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500, statusText: '네트워크 에러' });
  }
}
