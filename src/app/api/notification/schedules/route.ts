import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../../prisma/client';
import { cronParser } from '@src/utils/cron-parser';

export async function GET(req: NextRequest) {
  const { prisma, close } = await connect();

  const rawToken = req.headers.get('Authorization') || '';
  const prefix = rawToken?.split(' ')[0];
  const token = rawToken?.split(' ')[1];

  if (prefix !== 'Bearer') return NextResponse.json({ message: '잘못된 토큰 형식' });

  try {
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
  } finally {
    await close();
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
function mappingNextScheduleInfo(scheduleList: NotificationSchedule[], userId: string = '') {
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

/**
 * userId 와 일치하는 유저의 스케줄 목록 조회
 * @param userId
 */
async function getScheduleList(userId?: string) {
  const { prisma, close } = await connect();

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
  } finally {
    await close();
  }
}
