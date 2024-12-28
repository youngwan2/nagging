import { NextSchedule, NotificationSchedule } from '@src/types/schedule.types';
import { cronParser } from './cronUtils';

/**
 * 다음 알림 일정 정보들 맵핑
 * @param scheduleList
 * @returns
 */
export function mappingNextScheduleInfo(scheduleList: NotificationSchedule[], userId: string = '') {
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
