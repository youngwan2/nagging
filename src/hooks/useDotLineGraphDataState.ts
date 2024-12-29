import { dateRanges } from '@src/utils/dateUtils';
import { useFetchExchangeRateTimeline } from './queries/useFetchCurrencyQuery';
import { mappingCurrencyData } from '@src/utils/currencyUtils';
import { useState } from 'react';

export default function useDotLineGraphDataState() {
  const [currency, setCurrency] = useState('krw');

  const { NINE_MONTHS_AGO, SIX_MONTHS_AGO, THREE_MONTHS_AGO, CURRENT } = dateRanges;
  const dates = [NINE_MONTHS_AGO, SIX_MONTHS_AGO, THREE_MONTHS_AGO, CURRENT];

  const { data, isError, isLoading } = useFetchExchangeRateTimeline(dates);

  const mappingData = mappingCurrencyData(currency, data);

  function handleCurrencyCode(code: string) {
    setCurrency(code);

    console.log(code);
  }

  return {
    data: mappingData,
    isError,
    isLoading,
    code: currency,
    handleCurrencyCode,
  };
}
