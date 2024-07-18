import React from 'react';
import { CurrencyPair } from '../container/InfomationContainer';

interface PropsType {
  currencyPairs: CurrencyPair[];
  selectedPair: string;
  onClick: (pair: string) => void;
  footer: React.ReactNode;
}
export default function ExchangeRatesTable({
  currencyPairs,
  selectedPair,
  onClick,
  footer,
}: PropsType) {
  return (
    <div className="bg-background text-foreground p-6 rounded-lg shadow-md">
      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="dark:text-white bg-muted text-muted-foreground">
              <th className="px-4 py-2 text-left">Currency Pair</th>
              <th className="px-4 py-2 text-right">Rate</th>
              <th className="px-4 py-2 text-right">Change</th>
            </tr>
          </thead>
          <tbody>
            {currencyPairs.map((pair) => (
              <tr
                key={pair.pair}
                className={`dark:text-gray-300 border-b hover:bg-muted/50 cursor-pointer ${selectedPair === pair.pair ? 'bg-[rgba(80,80,100,0.3)]' : ''}`}
                onClick={() => onClick(pair.pair)}
              >
                {/* 환전 단위 */}
                <td className="px-4 py-2 text-left">{pair.pair}</td>
                {/* 환율 */}
                <td className="px-4 py-2 text-right">{pair.rate.toFixed(2)}</td>
                {/* 변동 퍼센트 */}
                <td
                  className={`px-4 py-2 text-right ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {pair.change >= 0 ? '+' : '-'}
                  {Math.abs(pair.change).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 선택 환율 정보 */}
      {footer}
    </div>
  );
}
