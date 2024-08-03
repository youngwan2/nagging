import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@src/auth';
import prisma from '../../../../../prisma/client';
import { urlConfigs } from '@src/configs/url.config';

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

    return NextResponse.json(
      { optionList: results, nextURL, totalCount, maxPage },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}
