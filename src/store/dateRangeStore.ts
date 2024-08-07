import { ReportRequest } from '@src/services/adsense.service';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 보고서 조회 필터
const dateRange: ReportRequest = {
  dateRange: 'CUSTOM',
  dimensions: ['MONTH'], // DATE, WEEK,
  startDate: {
    day: 1,
    month: 1,
    year: new Date().getFullYear(),
  },
  endDate: {
    day: 31,
    month: 12,
    year: new Date().getFullYear(),
  },
  metrics: ['ESTIMATED_EARNINGS', 'CLICKS', 'COST_PER_CLICK'],
  reportingTimeZone: 'ACCOUNT_TIME_ZONE',
  currencyCode: 'USD',
};

interface DateRangeState {
  dateRange: ReportRequest;
  updateDimensions: (dimension: string) => void;
}
export const useDateRange = createStore<DateRangeState>()(
  devtools(
    persist(
      (set) => ({
        dateRange,
        updateDimensions: (dimension) =>
          set((state) => ({
            dateRange: { ...state.dateRange, dimensions: [dimension] },
          })),
      }),
      { name: 'dateRangeStore' },
    ),
  ),
);
