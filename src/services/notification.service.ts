import { cronParser } from '@src/utils/cron-parser';
import { connect } from '../../lib/prisma/client';

/**
 * 디비로 부터 등록된 사용자 스케줄 정보를 조회
 * @param userId
 * @returns
 */
export async function getSchedule(userId: string) {
  const { prisma, close } = await connect();

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
  } finally {
    close();
  }
}
