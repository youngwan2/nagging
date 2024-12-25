import { useState } from 'react';
import { currencies } from '@src/constants/currencies';
import { formatDate, mappingPair, selectPair } from '@src/utils/formatUtils';
import { defaultOptions } from '@src/configs/tanstack.config';
import { Method } from '@src/configs/fetch.config';
import useFetchQuery from './queries/useFetchQuery';

const currencyCodes = Object.keys(currencies);

export const useCurrencyData = () => {
  const today = formatDate(new Date());
  const [date, setDate] = useState<string>(today);

  const { data, isError, isPending } = useFetchQuery(
    {
      reqUrl: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`,
      method: Method.GET,
      options: defaultOptions,
    },
    [date],
  );

  const initialPair = selectPair(data, currencyCodes) as [string, string][];
  const currencyPairs = mappingPair(initialPair, data?.date || '');
  const [selectedPair, setSelectedPair] = useState(currencyPairs[25]?.pair);

  const selectedCurrencyPair = currencyPairs.find((pair) => pair.pair === selectedPair);

  return {
    date,
    setDate,
    isError,
    isPending,
    currencyPairs,
    selectedPair,
    setSelectedPair,
    selectedCurrencyPair,
  };
};
