import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../lib/auth';
import { urlConfigs } from '@src/configs/url.config';
import { prisma } from '../../../../../prisma/client';

const LIMIT = 5;

/** GET | 유저가 저장한 보고서 옵션목록 조회 */
export async function GET(req: NextRequest) {
  const userId = (await auth())?.userId;
  const page = Number(req.nextUrl.searchParams.get('page'));
  const nextURL = urlConfigs.protocol + urlConfigs.host + '?page=' + (page + 1);
  const SKIP = LIMIT * (page - 1);

  try {
    const totalCount = await prisma.notificationReports.count();
    const maxPage = Math.ceil(totalCount / 5);
    const results = await prisma.notificationReports.findMany({
      skip: SKIP,
      take: LIMIT,
      orderBy: { createdAt: 'desc' },
      where: { userId: userId },
    });

    return NextResponse.json({ optionList: results, nextURL, totalCount, maxPage }, { status: 200 });
  } catch (error) {
    console.error('notification/reports/route.ts', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

/** POST | 보고서 옵션등록 */
export async function POST(req: NextRequest) {
  const userId = (await auth())?.userId;

  try {
    if (!userId) return NextResponse.json({ message: '사용자를 찾을 수 없습니다.', status: 404 });
    const data = await req.json();
    await prisma.notificationReports.create({
      data: {
        userId,
        report: JSON.stringify(data),
      },
    });
    return NextResponse.json({ message: '성공적으로 추가되었습니다.', status: 201 });
  } catch (error) {
    console.error('notification/reports/route.ts', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}
