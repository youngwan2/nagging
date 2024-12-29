/** 날짜 포맷을 변경 */
export function formatDate(date: Date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// 날짜를 계산하는 함수
function getDateMonthsAgo(months: number): Date {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}

// 열거체를 정의
enum DateRange {
  CURRENT = 'CURRENT',
  THREE_MONTHS_AGO = 'THREE_MONTHS_AGO',
  SIX_MONTHS_AGO = 'SIX_MONTHS_AGO',
  NINE_MONTHS_AGO = 'NINE_MONTHS_AGO',
}

// 날짜 값들을 객체로 저장
export const dateRanges = {
  [DateRange.CURRENT]: formatDate(new Date()),
  [DateRange.THREE_MONTHS_AGO]: formatDate(getDateMonthsAgo(3)),
  [DateRange.SIX_MONTHS_AGO]: formatDate(getDateMonthsAgo(6)),
  [DateRange.NINE_MONTHS_AGO]: formatDate(getDateMonthsAgo(9)),
};
