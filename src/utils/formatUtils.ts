import { FlattenedData, Row } from '@src/types/analytics.types';
import { CurrencyPair } from '@src/types/currency.types';
import { Data } from '@src/types/data.types';

/** >>>>>>> 환율 <<<<<<< */
export function formatDate(date: Date) {
  // 년, 월, 일 값을 추출
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  let day = date.getDate().toString().padStart(2, '0');

  // 원하는 형식으로 조합
  return `${year}-${month}-${day}`;
}

/** data 를 [string, string] 형태로 변환 후 반환하는 함수 */
export function selectPair(data: Data, target: string[] = ['krw']) {
  if (!data || data.usd || data.date) return [];
  return Object.entries(data.usd).filter((unit) => target.includes(unit[0])) || ['krw', 0];
}

/** CurrencyPair 인터페이스의 배열 형태로 변환하는 함수
 * @description {  pair: string;  rate: number;  date: string;}[] 형태로 변환 후 반환
 */
export function mappingPair(initialPair: [string, string][] = [], date: string = ''): CurrencyPair[] {
  return initialPair.map(([key, value]) => {
    return {
      pair: `USD/${key.toUpperCase() ?? '조회불가'}`,
      rate: Number(value) ?? '조회불가',
      date: date ?? new Date().toLocaleDateString(),
    };
  });
}

/** 보고서 중첩배열 평탄화 */
export function flattenRows(rows: Row[]): FlattenedData[] {
  if (!rows || rows?.length === 0) return [];
  return rows.map((row) => {
    return {
      date: row.cells[0].value,
      value: Number(row.cells[1].value),
    };
  });
}
