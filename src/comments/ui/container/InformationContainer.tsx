'use client';
import React from 'react';

import Container from './Container';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import ExchangeRateTableSkeleton from '../skeleton/ExchangeRateTableSkeleton';
import ContentView from '@src/comments/pages/info-page/ContentView';
import ErrorMessage from '../message/ErrorMessage';

import { useCurrencyData } from '@src/hooks/useCurrencyData';

interface PropsType {
  token?: string;
}

export default function InformationContainer({}: PropsType) {
  const { date, setDate, isError, isPending, currencyPairs, selectedPair, setSelectedPair, selectedCurrencyPair } =
    useCurrencyData();

  const handlePairSelect = (pair: string) => setSelectedPair(pair);
  const handleDateSelect = (date: string) => setDate(date);

  if (isError) {
    return (
      <ErrorMessage
        message={`현재 일자(${date})로 환율 데이터를 가져오지 못했습니다.`}
        title="존재하지 않는 날짜 조회"
        onClick={() => handleDateSelect('latest')}
      />
    );
  }

  return (
    <Container elName="section" className="w-full">
      {isPending ? (
        <PendingView date={date} />
      ) : (
        <ContentView
          date={date}
          currencyPairs={currencyPairs}
          selectedPair={selectedPair}
          selectedCurrencyPair={selectedCurrencyPair}
          handleDateSelect={handleDateSelect}
          handlePairSelect={handlePairSelect}
        />
      )}
    </Container>
  );
}

/** 서브 컴포넌트 */
const PendingView = ({ date }: { date: string }) => (
  <>
    <Heading level="2" className="text-[0.95rem] font-light">
      데이터를 조회중입니다.
    </Heading>
    <ExchangeRateTableSkeleton />
    <Text elementName="p" className=" text-muted-foreground text-[14px] text-end py-3">
      {date}
    </Text>
  </>
);
