'use client';
import React, { useState } from 'react';
import useQueryReact, { defaultOptions } from '@src/hooks/useQueryReact';

import ExchangeRatesTable from '../table/ExchangeRatesTable';
import Container from './Container';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import ExchangeRateTableSkeleton from '../skeleton/ExchangeRateTableSkeleton';
import ErrorMessage from '../message/ErrorMessage';

import { Method } from '@src/configs/fetch.config';
import { currencies } from '@src/constants/currencies';
import { formatDate, mappingPair, selectPair } from '@src/utils/function';

export interface CurrencyPair {
  pair: string;
  rate: number;
  date: string;
}

const queryOptions = {
  ...defaultOptions,
  staleTime: 24 * 60 * 60, // 24 시간
};

const currencyCodes = Object.keys(currencies);

interface PropsType {
  token?: string;
}
export default function InformationContainer({}: PropsType) {
  const today = formatDate(new Date());
  const [date, setDate] = useState<string>(today);

  const reqUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date.length > 1 ? date : 'latest'}/v1/currencies/usd.json`;
  const { data, isError, isPending } = useQueryReact(
    {
      reqUrl,
      method: Method.GET,
      options: queryOptions,
    },
    [date],
  );

  const initialPair = selectPair(data, currencyCodes) as [string, string][];
  const selectDate = data?.date || '';
  const currencyPairs = mappingPair(initialPair, selectDate);

  const [selectedPair, setSelectedPair] = useState(currencyPairs[25]?.pair);

  const selectedCurrencyPair: CurrencyPair = currencyPairs.find((pair) => pair.pair === selectedPair) as CurrencyPair;

  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };

  if (isError)
    return (
      <ErrorMessage
        message="현재 일자로 환율 데이터를 가져오지 못했습니다."
        title="존재하지 않는 날짜 조회"
        onClick={() => setDate('latest')}
      />
    );
  if (!data || isPending)
    return (
      <Container elName={'section'} className="w-full">
        <Heading level="2" className="text-[0.95rem] font-light">
          데이터를 조회중입니다.
        </Heading>
        <ExchangeRateTableSkeleton />
      </Container>
    );
  return (
    <Container elName={'section'} className="w-full">
      <Text elementName={'p'}>
        1일 간격으로 업데이트되는 {initialPair.length}개국의 환율 정보를 확인할 수 있습니다. 환율은 제공되는 은행, 기준
        시간에 따라서 약간의 차이가 발생할 수 있으므로 참고 바랍니다.
      </Text>
      <Text elementName={'p'} className=" text-muted-foreground text-[14px] text-end py-3">
        {date}
      </Text>

      {isPending ? (
        <ExchangeRateTableSkeleton />
      ) : (
        <ExchangeRatesTable
          onClick={handlePairSelect}
          selectedPair={selectedPair}
          currencyPairs={currencyPairs}
          aside={
            <Text elementName={'p'} className="p-4">
              {selectedCurrencyPair
                ? `1 USD = ${selectedCurrencyPair.rate} ${selectedCurrencyPair.pair}`
                : '선택한 환율정보가 표시됩니다.'}
            </Text>
          }
        />
      )}
      {!currencyPairs && (
        <ErrorMessage
          className="mt-3"
          message="현재 일자로 환율 데이터를 가져오지 못했습니다."
          title="존재하지 않는 날짜 조회"
          onClick={() => setDate('latest')}
        />
      )}
    </Container>
  );
}
