import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../../prisma/client';
import { connect } from '../../../../../prisma/client';
import { cronParser } from '@src/utils/cron-parser';

export async function GET(req: NextRequest) {
  const rawToken = req.headers.get('Authorization') || '';
  const prefix = rawToken?.split(' ')[0];
  const token = rawToken?.split(' ')[1];

  if (prefix !== 'Bearer')
    return NextResponse.json({ error: '잘못된 토큰 형식' }, { status: 400 });

  try {
    const { prisma } = await connect();
    const userId = (
      await prisma.account.findMany({
        where: {
          access_token: token,
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
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

interface NotificationReport {
  reportId: number;
  userId: string;
  report: string;
  createdAt: Date;
  updatedAt: Date;
  task: boolean;
}

interface NotificationSchedule {
  notificationReports: NotificationReport;
  cronExpression: string;
  createdAt: Date;
}

interface ScheduleInfo {
  nextReminder: string;
  subsequentReminder: string;
}

interface UserSchedule {
  reportId: number;
  nextScheduleInfo: ScheduleInfo;
}

interface NextSchedule {
  [userId: string]: UserSchedule;
}

/**
 * 다음 알림 일정 정보들 맵핑
 * @param scheduleList
 * @returns
 */
function mappingNextScheduleInfo(
  scheduleList: NotificationSchedule[],
  userId: string = '',
) {
  const nextSchedule: NextSchedule = {
    [userId]: {
      reportId: 0,
      nextScheduleInfo: {
        nextReminder: '',
        subsequentReminder: '',
      },
    },
  };
  for (const schedule of scheduleList) {
    const { userId, reportId } = schedule.notificationReports;
    const standardDate = schedule.createdAt;
    const cronExpression = schedule.cronExpression;

    const nextScheduleInfo = cronParser(standardDate, cronExpression);

    if (!nextScheduleInfo) return false;

    nextSchedule[userId] = {
      reportId,
      nextScheduleInfo,
    };
  }
  return nextSchedule;
}

async function getScheduleList(userId?: string) {
  try {
    const { prisma } = await connect();
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
