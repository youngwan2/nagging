import { NotificationReport } from './report.types';

export interface NotificationSchedule {
  notificationReports: NotificationReport;
  cronExpression: string;
  createdAt: Date;
}

export interface ScheduleInfo {
  nextReminder: string;
  subsequentReminder: string;
}

export interface UserSchedule {
  reportId: number;
  nextScheduleInfo: ScheduleInfo;
}

export interface NextSchedule {
  [userId: string]: UserSchedule;
}

interface Schedule {
  notificationReports: NotificationReport;
  createdAt: string;
  cronExpression: string;
}

interface NextScheduleInfo {
  nextReminder: string;
  subsequentReminder: string;
}

interface UserNextScheduleInfo {
  reportId: number;
  nextScheduleInfo: NextScheduleInfo;
}

export interface ScheduleList {
  scheduleList: Schedule[];
  nextScheduleInfo: { [key: string]: UserNextScheduleInfo };
}
