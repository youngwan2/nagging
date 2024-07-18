'use client';

import { useState } from 'react';

import ExchangeRatesTable from '../table/ExchangeRatesTable';
import Container from './Container';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import TableFooter from '../footer/TableFooter';
import React from 'react';

export interface CurrencyPair {
  pair: string;
  rate: number;
  change: number;
}

const currencyPairs = [
  { pair: 'USD/KRW', rate: 1234.56, change: 0.5 },
  { pair: 'EUR/KRW', rate: 1456.78, change: -0.3 },
  { pair: 'JPY/KRW', rate: 10.12, change: 0.1 },
  { pair: 'GBP/KRW', rate: 1678.9, change: 0.7 },
  { pair: 'AUD/KRW', rate: 890.12, change: -0.2 },
  { pair: 'CAD/KRW', rate: 567.89, change: 0.4 },
];

export default function InfomationContainer() {
  const currentDate = new Date().toLocaleDateString();
  const [selectedPair, setSelectedPair] = useState(currencyPairs[0].pair);
  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair);
  };
  const selectedCurrencyPair: CurrencyPair = currencyPairs.find(
    (pair) => pair.pair === selectedPair,
  ) as CurrencyPair;

  if (!selectedCurrencyPair) return null;
  return (
    <Container elName={'section'} className="w-full">
      <Text
        elementName={'p'}
        className=" text-muted-foreground text-[14px] text-end py-3"
      >
        {currentDate}
      </Text>
      <ExchangeRatesTable
        onClick={handlePairSelect}
        selectedPair={selectedPair}
        currencyPairs={currencyPairs}
        footer={
          <TableFooter
            heading={
              <Heading level="2" className="text-xl font-bold mb-2 py-2 mt-3">
                {selectedCurrencyPair.pair}
              </Heading>
            }
            body={
              <div className=" grid grid-cols-2 gap-4 ">
                <div className="dark:text-gray-300">
                  <p className="dark:text-gray-400 text-muted-foreground">
                    Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {selectedCurrencyPair.rate.toFixed(2)}
                  </p>
                </div>
                <div className="dark:text-gray-300">
                  <p className="dark:text-gray-400 text-muted-foreground">
                    Change
                  </p>
                  <p
                    className={`text-2xl font-bold ${selectedCurrencyPair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {selectedCurrencyPair.change >= 0 ? '+' : '-'}
                    {Math.abs(selectedCurrencyPair.change).toFixed(2)}%
                  </p>
                </div>
              </div>
            }
          />
        }
      />
    </Container>
  );
}
