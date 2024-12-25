import { CurrencyPair } from './currency.types';

export interface ContentViewProps {
  date: string;
  currencyPairs: CurrencyPair[];
  selectedPair: string;
  selectedCurrencyPair: CurrencyPair | undefined;
  handleDateSelect: (date: string) => void;
  handlePairSelect: (pair: string) => void;
}
