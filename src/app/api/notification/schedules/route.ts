import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/client';
import { auth } from '../../../../../lib/auth';
import { Session } from 'next-auth';
import { mappingNextScheduleInfo } from '@src/utils/scheduleUtils';

export async function GET() {
  try {
    const { access_token } = ((await auth()) as Session) || { userId: '', accessToken: '' };
    if (!access_token) return NextResponse.json({ message: '접근 권한이 없습니다.', status: 403 });

    const userId = (
      await prisma.account.findMany({
        where: {
          access_token: access_token,
        },
        select: { userId: true },
      })
    )[0].userId;

    const scheduleList = await getScheduleList(userId);

    if (scheduleList.length < 1) {
      return NextResponse.json({ message: '예약된 스케줄이 없습니다.' });
    } else {
      const nextScheduleInfo = mappingNextScheduleInfo(scheduleList, userId);

      return NextResponse.json({ scheduleList, nextScheduleInfo });
    }
  } catch (error) {
    console.error('notification/schedules/route.ts', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

// 예약된 알림 제거
export async function DELETE() {
  try {
    const { access_token } = ((await auth()) as Session) || { userId: '', accessToken: '' };
    if (!access_token) return NextResponse.json({ message: '접근 권한이 없습니다.', status: 403 });

    const userId = (
      await prisma.account.findMany({
        where: {
          access_token: access_token,
        },
        select: { userId: true },
      })
    )[0].userId;

    // 예약 알림 제거
    await prisma.notificationCron.delete({
      where: {
        userId,
      },
    });

    // 예약 알림 상태 비활성화
    await prisma.notificationReports.updateMany({
      where: {
        userId,
      },
      data: {
        task: false,
      },
    });

    return NextResponse.json({ message: '성공적으로 취소되었습니다.', status: 204 });
  } catch (error) {
    console.error('notification/schedules/route.ts', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

/**
 * userId 와 일치하는 유저의 스케줄 목록 조회
 * @param userId
 */
async function getScheduleList(userId?: string) {
  try {
    return await prisma.notificationCron.findMany({
      select: {
        notificationReports: true,
        createdAt: true,
        cronExpression: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
