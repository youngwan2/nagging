/** 매월 1일 마다 알림 받기 */
const everyMonth = '0 6 1 * *';

/** 매주 월요일 오전 6시 마다 알림 받기 */
const everyWeek = '0 6 * * 1';

/** 매년 1월 1일 오전 6시 마다 알림 받기 */
const everyYear = '0 6 1 1 * ';

export const cronOptions = [
  {
    label: '주 단위',
    expression: everyWeek,
    title: '매주 월요일 오전 06:00 정기 보고',
  },
  {
    label: '월 단위',
    expression: everyMonth,
    title: '매월 첫째주 1일 오전 06:00 정기 보고',
  },
  {
    label: '년 단위',
    expression: everyYear,
    title: '매년 1월 1일 오전 06:00 정기 보고',
  },
];
