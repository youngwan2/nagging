export interface NotificationReport {
  reportId: number;
  userId: string;
  report: string;
  createdAt: Date;
  updatedAt: Date;
  task: boolean;
}

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
