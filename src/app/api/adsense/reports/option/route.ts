import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';
import { auth } from '@src/auth';

/** GET | 유저가 저장한 보고서 옵션목록 조회 */
export async function GET() {
  const userId = (await auth())?.userId;
  try {
    const results = await prisma.notificationReports.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}
