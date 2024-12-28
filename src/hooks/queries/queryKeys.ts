export const QUERY_KEYS = {
  USER: {
    DETAILS: (userId: string) => ['user', userId], // 동적 key
    LIST: ['users'], // 정적 key
  },
  SCHEDULE: {
    DETAILS: (reportId: string) => ['schedules', reportId],
    LIST: ['schedules'],
  },
  REPORT: {
    PER_PAGE: (page: number) => ['reports', page],
    DETAILS: (reportId: string) => ['reports', reportId],
    LIST: ['reports'],
  },
  CURRENCY: {
    LIST: ['currencies'],
    DETAILS: (date: string) => ['currencies', date],
  },
};
