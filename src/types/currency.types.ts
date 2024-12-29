import { currencies } from '@src/constants/currencies';

/** @src/types/currency.types.ts */
export interface CurrencyPair {
  pair: string;
  rate: number;
  date: string;
}

type CurrencyKeys = keyof typeof currencies;
export type DataType = {
  /** 한화(Currency Korean Won) */
  [key: CurrencyKeys]: string | number;
} & {
  /** 범례(Category) */
  name: string;
  /** 매매 기준율(Trading base rate)*/
  standard: number;
};

interface DataState {
  isLoading: boolean;
  isError: boolean;
}
export interface DotLineGraphPropsType extends DataState {
  code: string;
  data: DataType[];
}

export type CurrencyType = Record<string, string>;

export interface DotLineChartDataType {
  date: string;
  usd: CurrencyType;
}
