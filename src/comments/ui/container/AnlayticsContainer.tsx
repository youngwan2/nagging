'use client';

import useQueryReact from '@src/hooks/useQueryReact';

import LineGraph from '@src/comments/ui/graph/LineGraph';
import Container from '@src/comments/ui/container/Container';
import ChartContainer from '@src/comments/ui/container/Container';
import Heading from '@src/comments/ui/heading/Heading';
import Text from '@src/comments/ui/text/Text';
import CalendarContainer from '@src/comments/ui/container/CalendarContainer';

import type { ReportRequest } from '../../../../lib/adsense';
import { Method } from '@src/configs/fetch.config';
import {
  arrayToCSV,
  createCsvFile,
  download,
  flattenRows,
} from '@src/utils/function';

import { PiFileCsvThin } from 'react-icons/pi';
import Button from '../button/Button';
import GraphSkeleton from '../skeleton/GraphSkeleton';
import { useReports } from '@src/hooks/useReports';

// 보고서 조회 필터
const dateRange: ReportRequest = {
  dateRange: 'CUSTOM',
  dimensions: ['MONTH'], // DATE, WEEK,
  startDate: {
    day: 1,
    month: 1,
    year: 2024,
  },
  endDate: {
    day: 31,
    month: 12,
    year: 2024,
  },
  metrics: ['ESTIMATED_EARNINGS', 'CLICKS', 'COST_PER_CLICK'],
  reportingTimeZone: 'ACCOUNT_TIME_ZONE',
  currencyCode: 'USD',
};

const reqUrl = '/api/adsense/reports';
const options = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  refetchIntervalInBackground: false,
  enabled: true,
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: 3,
};
export default function AnlayticsContainer({ token }: { token?: string }) {
  /** 보고서 상태관리 */
  const { state, dispatch } = useReports(dateRange);

  /** 보고서 요청 */
  const { data, isPending, isRefetching, isError } = useQueryReact(
    { reqUrl, method: Method.POST, token, body: state, options },
    [state],
  );

  const flatRows = flattenRows(data?.rows);
  const totalProfit = flatRows.reduce((acc, row) => acc + row.value, 0); // 전체 추정 수익

  /** 시계열 수익 CSV 다운로드 */
  function handleDownLoadCsv(
    rows: { date: string; value: number }[],
    totalProfit: number,
  ) {
    const mergeRows = [...rows, { date: 'Total', value: totalProfit }];
    const csvForamt = arrayToCSV(mergeRows);
    const blob = createCsvFile(csvForamt);
    const fileName =
      state.startDate.year +
      '년' +
      state.startDate.month +
      '월' +
      state.startDate.day +
      '일 ~ ' +
      state.endDate.year +
      '년' +
      state.endDate.month +
      '월 ' +
      state.endDate.day +
      '일 수익금 통계';
    download(blob, fileName);
  }

  /** 업데이트 */
  function onUpdateYear(startYear: number, endYear: number) {
    dispatch({
      type: 'SET_START_DATE',
      payload: { ...dateRange.startDate, year: startYear },
    });
    dispatch({
      type: 'SET_END_DATE',
      payload: { ...dateRange.endDate, year: endYear },
    });
  }

  /** 그래프 생성 요청 */
  async function onSearch(form: FormData) {
    const startYear = Number(form.get('startYear')?.valueOf().toString());
    const endYear = Number(form.get('endYear')?.valueOf().toString());

    if (startYear < 2010) alert('시작 연도는 2010년 이상이어야 합니다.');
    if (endYear > new Date().getFullYear())
      alert(`끝 연도는 ${new Date().getFullYear() - 1} 이어야 합니다.`);

    onUpdateYear(startYear, endYear);
  }

  return (
    <Container elName={'div'} className="w-full relative">
      <Heading level="2" className="pb-[0.75em]">
        예상 수익 통계
        <span className="text-[0.55em] pl-4 text-gray-500">
          Expected Return Statistics
        </span>
      </Heading>
      <Text elementName="p" className="mt-8 text-center">
        1달 간격으로 연간 수익을 확인할 수 있습니다.
      </Text>
      <Text elementName="p" className="mt-2 text-center">
        자세한 통계 확인을 원하신다면 [보고서 설정] 페이지를 이용해주세요.
      </Text>

      {/* 총 수익 */}
      <Text elementName="p" className="mt-[0.5rem] text-center min-h-[30px]">
        {flatRows?.length > 1
          ? `조회 기간 동안 $${totalProfit?.toFixed(2)} 수익을 달성하셨습니다.`
          : null}
      </Text>

      {/* 보고서 다운로드 */}
      <Button
        className="dark:text-white border rounded-md p-1 hover:bg-[rgba(0,0,0,0.1)] flex flex-col justify-center items-center absolute right-[-4rem] top-[-3rem]"
        onClick={() => handleDownLoadCsv(flatRows, totalProfit)}
        title="시계열 수익 보고서 CSV 형식으로 다운로드 요청하는 버튼"
      >
        <PiFileCsvThin className="text-[1.3em]" />
        <span className="text-[0.85rem]">CSV</span>
      </Button>

      {/* 검색범위  */}
      <CalendarContainer onSearch={onSearch} />

      {/* 그래프 */}
      <ChartContainer
        elName={'div'}
        className="w-full max-h-[500px] h-[500px] mt-7"
      >
        {isPending || isRefetching ? (
          <Heading level="2" className="text-[1em] font-normal text-center">
            {isError ? (
              '접근 권한 혹은 네트워크 문제로 조회에 실패하였습니다. 나중에 다시시도 해주세요.'
            ) : (
              <GraphSkeleton />
            )}
          </Heading>
        ) : (
          <LineGraph data={flatRows} />
        )}
      </ChartContainer>
    </Container>
  );
}
