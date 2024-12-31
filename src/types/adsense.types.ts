export type CustomDate = {
  day?: number;
  month?: number;
  year: number;
};

export interface ReportRequest {
  dateRange: 'CUSTOM';
  dimensions: string[];
  endDate: CustomDate;
  metrics: string[];
  reportingTimeZone: 'ACCOUNT_TIME_ZONE';
  startDate: CustomDate;
  currencyCode: string;
}

export interface ReportOptionType {
  reportName: string;
  dateRange: 'CUSTOM';
  dimensions: ['WEEK'] | ['MONTH'] | ['YEAR'];
  startDate: { day: number; month: number; year: number };
  endDate: { day: number; month: number; year: number };
  metrics:
    | ['CLICKS']
    | ['COST_PER_CLICK']
    | ['ESTIMATED_EARNINGS']
    | ['CLICKS', 'COST_PER_CLICK']
    | ['CLICKS', 'ESTIMATED_EARNINGS']
    | ['COST_PER_CLICK', 'ESTIMATED_EARNINGS']
    | ['CLICKS', 'COST_PER_CLICK', 'ESTIMATED_EARNINGS'];
  currencyCode: string;
}
