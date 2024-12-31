import { metrics } from '@src/constants/report';

type MetricsValue = (typeof metrics)[number]['value'];

export type MetricsType = MetricsValue[];

interface DateType {
  day: number;
  month: number;
  year: number;
}

export interface ReportFilter {
  reportName: string;
  dateRange: 'CUSTOM'; // 예시로 다른 날짜 범위도 추가
  dimensions: 'DATE' | 'WEEK' | 'MONTH';
  startDate: DateType;
  endDate: DateType;
  metrics: MetricsType;
  reportingTimeZone: 'ACCOUNT_TIME_ZONE';
  currencyCode: string;
}

export interface NotificationReport {
  reportId: number;
  userId: string;
  report: string;
  createdAt: Date;
  updatedAt: Date;
  task: boolean;
}
