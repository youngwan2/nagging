import { CurrencyPair, DataType, DotLineChartDataType } from '@src/types/currency.types';
import { Data } from '@src/types/data.types';

/** data 를 [string, string] 형태로 변환 후 반환하는 함수 */
export function selectPair(data: Data, target: string[] = ['krw']) {
  if (!data || !data.usd || !data.date) return [];
  return Object.entries(data.usd).filter((unit) => target.includes(unit[0])) || ['krw', 0];
}

/**
 * CurrencyPair 인터페이스의 배열 형태로 변환하는 함수
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

/** 점선 그래프의 데이터로 사용할 수 있도록 기존 쿼리 데이터를 맵핑 */
export function mappingCurrencyData(key: string, data?: any[] | DotLineChartDataType[]): DataType[] {
  if (data?.length) {
    return data.map((d) => {
      return {
        name: d.date,
        [key]: d.usd[key],
        standard: 1365.69, // temp
      };
    });
  }

  return [];
}
