import { CurrencyPair } from '@src/comments/ui/container/InformationContainer';
import { FlattenedData, Row } from '@src/types/anlaytics.types';

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

export interface ArrayToCsvProps {
  (
    array: {
      date: string;
      value: number;
    }[],
  ): string;
}

/** 배얼을 CSV 포맷으로 변경
 * @description 첫 행을 객체 배열의 key 인 date, value 으로 구분하고, 두 번째 행부터 date, value 의 각 셀을 한 묶으로 개행하며 배치
 */
export const arrayToCSV: ArrayToCsvProps = (array) => {
  const headers = Object.keys(array[0]).join(',').replace('value', 'value(단위: $)');
  const rows = array.map((obj) => Object.values(obj).join(',')).join('\n'); // date, value을 하나의 쌍으로 개행하며 배치
  return `${headers}\n${rows}`;
};

/** CSV 파일 생성 */
export const createCsvFile = (csvForamtData: string) => {
  return new Blob([csvForamtData], { type: 'text/csv;charset=utf-8' });
};

/** 생성한 CSV 다운로드 */
export const download = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob); // ex) blob:url 형태
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url); // 다운로드 후 삭제
};

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
export function selectPair(data: { date: string; usd: { [key: string]: string } }, target: string[] = ['krw']) {
  if (!data) return ['조회불가', '조회불가'];
  return Object.entries(data?.usd).filter((unit) => target.includes(unit[0])) || ['krw', 0];
}

/** CurrencyPair 인터페이스의 배열 형태로 변환하는 함수
 * @description {  pair: string;  rate: number;  date: string;}[] 형태로 변환 후 반환
 */
export function mappingPair(initialPair: [string, string][], date: string): CurrencyPair[] {
  return initialPair.map(([key, value]) => {
    return {
      pair: `USD/${key.toUpperCase() ?? '조회불가'}`,
      rate: Number(value) ?? '조회불가',
      date: date ?? new Date().toLocaleDateString(),
    };
  });
}

/** 1000 ~ 9999 까지 숫자 랜덤 생성 */
export function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}
