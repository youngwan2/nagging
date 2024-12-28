import { useEffect, useState } from 'react';
import { currencies } from '@src/constants/currencies';
import { mappingPair, selectPair } from '@src/utils/currencyUtils';
import { useFetchCurrencyQuery } from './queries/useFetchCurrencyQuery';

const currencyCodes = Object.keys(currencies);

export const useCurrencyDataState = () => {
  const { data, isError, isLoading } = useFetchCurrencyQuery();

  const initialPair = selectPair(data, currencyCodes) as [string, string][];
  const currencyPairs = mappingPair(initialPair, data?.date || '');
  const updatedDate = data ? data.date : null;

  const [selectedPair, setSelectedPair] = useState(currencyPairs[25]?.pair);
  const [date, setDate] = useState<string>(updatedDate);

  const selectedCurrencyPair = currencyPairs.find((pair) => pair.pair === selectedPair);

  // 날짜 업데이트
  useEffect(() => {
    setDate(updatedDate);
  }, [data]);

  return {
    date,
    setDate,
    isError,
    isLoading,
    currencyPairs,
    selectedPair,
    setSelectedPair,
    selectedCurrencyPair,
  };
};
