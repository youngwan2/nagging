'use client';

import Input from '@src/comments/ui/Input/Input';
import Button from '@src/comments/ui/button/Button';
import Form from '@src/comments/ui/form/Form';
import Label from '@src/comments/ui/label/Label';
import SelectOption from '@src/comments/ui/option/SelectOption';
import NotificationSelect from '@src/comments/ui/select/NotificationSelect';
import Select from '@src/comments/ui/select/Select';
import Text from '@src/comments/ui/text/Text';
import FlexBox from '../wrapper/FlexBox';

import { currencies } from '@src/constants/currencies';
import { FormEvent } from 'react';
import { useCreateReportMutation } from '@src/hooks/mutations/useReportMutation';

const { currencyCode, days, metrics, month, timeUnitOptions, years, endYears } = createInitData();

interface PropsType {
  userId?: string;
}

export default function NotificationReportOptionForm({ userId = '' }: PropsType) {
  const { mutate, isPending } = useCreateReportMutation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    mutate(formData);
  }

  return (
    <Form onSubmit={handleSubmit} method="post" className={'max-w-[645px] w-full'}>
      {/* 보고서 이름 */}
      <Label className="dark:text-white mt-3  w-full  max-w-[645px] flex flex-col">
        보고서 이름(Report Name)
        <Input
          type="text"
          className="p-2 border rounded-md bg-transparent "
          placeholder="보고서명(report name)"
          name="report-name"
        />
      </Label>

      {/* 주, 월, 일 */}
      <Label className="dark:text-white mt-3 inline-block w-full">
        차원(Dimension)
        <Select className="p-2 rounded-md" name="dimension" defaultValue={'WEEK'}>
          {timeUnitOptions.map((option) => (
            <SelectOption key={option.value} value={option.value} text={option.text} />
          ))}
        </Select>
      </Label>

      {/* 보고서 조회 시작일 */}
      <Label className="dark:text-white mt-3 inline-block w-full  max-w-[645px]">
        조회 시작일(Start Date)
        <FlexBox className="w-full justify-between ">
          {/* 연도, 월, 일 */}
          <NotificationSelect name="start-year" options={years} condition={new Date().getFullYear()} />
          <NotificationSelect className="ml-2" name="start-month" options={month} condition={1} />
          <NotificationSelect className="ml-2" name="start-day" options={days} condition={1} />
        </FlexBox>
      </Label>

      {/* 보고서 조회 종료일 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px] ">
        조회 종료일(End Date)
        <FlexBox className="w-full justify-between">
          {/* 연도, 월, 일 */}
          <NotificationSelect name="end-year" options={endYears} condition={new Date().getFullYear()} />
          <NotificationSelect className="ml-2" name="end-month" options={month} condition={12} />
          <NotificationSelect className="ml-2" name="end-day" options={days} condition={31} />
        </FlexBox>
      </Label>

      {/* 보고서 조회 지표 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px]">
        지표(metrics)
        <Text elementName={'span'} className="text-[0.85em] ml-3 text-gray-600">
          ※ 드래그를 통해 중복선택 가능(
          {'[Ctrl + Click] 을 통해 부분 선택 가능'})
        </Text>
        <Select className="p-2 rounded-md mt-2 " multiple name="metrics" defaultValue={['ESTIMATED_EARNINGS']}>
          {metrics.map((metric) => (
            <SelectOption key={metric.text} text={metric.text} value={metric.value} />
          ))}
        </Select>
      </Label>

      {/* 통화 코드 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px]">
        통화 코드(Currency Code)
        <Select className="p-2 rounded-md" name="code" defaultValue={'USD'}>
          {currencyCode.map((code) => {
            return (
              <SelectOption
                text={`${code[0].toLocaleUpperCase()},${code[1]}`}
                value={code[0].toLocaleUpperCase()}
                key={code[0]}
              />
            );
          })}
        </Select>
      </Label>
      {/* 보고서 등록 버튼 */}
      <Button
        className={`w-full p-3 rounded-md mt-5 bg-gradient-to-br from-slate-500 to-slate-800 text-white hover:from-slate-800 hover:to-slate-500`}
        onClick={() => {
          if (!userId) return alert('해당 서비스는 로그인 후 이용 가능합니다.');
        }}
      >
        {!isPending ? '보고서 등록' : '등록중..'}
      </Button>
      <input type="text" name="user-id" defaultValue={userId} className="hidden" />
    </Form>
  );
}

function createInitData() {
  const currencyCode = Object.entries(currencies);
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years: number[] = [];
  const endYears: number[] = [];

  for (let i = new Date().getFullYear(); i >= new Date().getFullYear() - 14; i--) {
    years.push(i);
  }

  for (let i = new Date().getFullYear() + 14; i >= new Date().getFullYear() - 14; i--) {
    endYears.push(i);
  }

  const metrics = [
    { text: '광고 클릭수', value: 'CLICKS' },
    { text: '광고 클릭 당 수익', value: 'COST_PER_CLICK' },
    { text: '추정 수익금', value: 'ESTIMATED_EARNINGS' },
    { text: '페이지 뷰', value: 'PAGE_VIEWS' },
  ];

  const timeUnitOptions = [
    { text: '주 단위', value: 'WEEK' },
    { text: '월 단위', value: 'MONTH' },
    { text: '일 단위', value: 'DATE' },
  ];

  return {
    currencyCode,
    days,
    month,
    years,
    endYears,
    metrics,
    timeUnitOptions,
  };
}
