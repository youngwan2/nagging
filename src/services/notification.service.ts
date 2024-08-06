import { cronParser } from '@src/utils/cron-parser';
import prisma from '../../prisma/client';

export async function getSchedule(userId: string) {
  try {
    const schedule = await prisma.notificationCron.findFirst({
      select: {
        notificationReports: true,
        cronExpression: true,
      },
      where: {
        userId,
      },
    });

    const cronExpression = schedule?.cronExpression || '';
    const scheduleDate = cronParser(new Date(), cronExpression);
    const scheduleInfos = { ...schedule, ...scheduleDate };
    return scheduleInfos;
  } catch (error) {
    console.error(error);

    throw new Error('스케줄 알림 목록 조회 실패');
  }
}
