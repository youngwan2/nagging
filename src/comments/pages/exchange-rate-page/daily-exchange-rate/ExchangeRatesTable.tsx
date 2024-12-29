import { CurrencyPair } from '@src/types/currency.types';
import React from 'react';

interface PropsType {
  currencyPairs: CurrencyPair[];
  selectedPair: string;
  onClick: (pair: string) => void;
  aside: React.ReactNode;
}
export default function ExchangeRatesTable({ currencyPairs, selectedPair, onClick, aside }: PropsType) {
  return (
    <div className="bg-background text-foreground p-2 rounded-lg shadow-md ">
      {/* 선택 환율 정보 */}
      {aside}
      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="dark:text-white bg-muted text-muted-foreground">
              <th className="md:px-4 p-2 text-left">Id</th>
              <th className="md:px-4 p-2 text-left">Currency Pair</th>
              <th className="md:px-4 p-2 text-right">Rate</th>
              <th className="md:px-4 p-2 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {currencyPairs.map((pair, i) => (
              <tr
                key={pair.pair}
                className={`dark:text-gray-300 border-b hover:bg-muted/50 cursor-pointer ${selectedPair === pair.pair ? 'bg-[rgba(80,80,100,0.3)]' : ''}`}
                onClick={() => onClick(pair.pair)}
              >
                {/* 식별 */}
                <td className="md:px-4 p-1 text-left">{i + 1}</td>
                {/* 환전 단위 */}
                <td className="md:px-4 p-1 text-left">{pair.pair}</td>
                {/* 환율 */}
                <td className="md:px-4 p-1 text-right">{pair.rate.toFixed(2)}</td>
                {/* 날짜 */}
                <td className="md:px-4 p-1 text-right">{pair.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
