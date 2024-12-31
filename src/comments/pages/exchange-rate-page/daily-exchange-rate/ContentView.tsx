import ErrorMessage from '@src/comments/ui/message/ErrorMessage';
import Text from '@src/comments/ui/text/Text';
import ExchangeRatesTable from './ExchangeRatesTable';
import { ContentViewProps } from '@src/types/exchange-rate-page.types';

export default function ContentView({
  date,
  currencyPairs,
  selectedPair,
  selectedCurrencyPair,
  handleDateSelect,
  handlePairSelect,
}: ContentViewProps) {
  return (
    <>
      <Text elementName="p">
        - 1일 간격으로 업데이트되는 {currencyPairs.length}개국의 환율 정보를 확인할 수 있습니다. <br />- API 시차로 인해
        매일 오전 10:30 기준으로 금일 환율을 확인할 수 있습니다.
      </Text>
      <Text elementName="p" className=" text-muted-foreground text-[14px] text-end py-3">
        {date}
      </Text>
      <ExchangeRatesTable
        onClick={handlePairSelect}
        selectedPair={selectedPair}
        currencyPairs={currencyPairs}
        aside={
          <Text elementName="p" className="p-4">
            {selectedCurrencyPair
              ? `1 USD = ${selectedCurrencyPair.rate} ${selectedCurrencyPair.pair}`
              : '선택한 환율정보가 표시됩니다.'}
          </Text>
        }
      />
      {currencyPairs.length === 0 && (
        <ErrorMessage
          className="mt-3"
          message="현재 일자로 환율 데이터를 가져오지 못했습니다."
          title="존재하지 않는 날짜 조회"
          onClick={() => handleDateSelect('latest')}
        />
      )}
    </>
  );
}
