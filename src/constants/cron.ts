/** 매일 알림 받기 */
const everyDay = '0 0 * * *'; // 매일 오전 00:00

/** 매월 1일 마다 알림 받기 */
const everyMonth = '0 0 1 * *'; // 매월 1일 오전 00:00

/** 매주 월요일 오전 00:00 마다 알림 받기 */
const everyWeek = '0 0 * * 1'; // 매주 월요일 오전 00:00

/** 매년 1월 1일 오전 00:00 마다 알림 받기 */
const everyYear = '0 0 1 1 *'; // 매년 1월 1일 오전 00:00

export const cronOptions = [
  {
    label: '일 단위',
    expression: everyDay,
    title: '매일 오전 00:00 정기 보고',
  },
  {
    label: '주 단위',
    expression: everyWeek,
    title: '매주 월요일 오전 00:00 정기 보고',
  },
  {
    label: '월 단위',
    expression: everyMonth,
    title: '매월 1일 오전 00:00 정기 보고',
  },
  {
    label: '년 단위',
    expression: everyYear,
    title: '매년 1월 1일 오전 00:00 정기 보고',
  },
];
