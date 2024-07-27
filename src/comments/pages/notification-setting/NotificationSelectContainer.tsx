'use client';

import Button from '@src/comments/ui/button/Button';
import Container from '@src/comments/ui/container/Container';
import Flex from '@src/comments/ui/container/Container';
import Label from '@src/comments/ui/label/Label';
import SelectOption from '@src/comments/ui/option/SelectOption';
import Select from '@src/comments/ui/select/Select';
import Text from '@src/comments/ui/text/Text';
import { currencies } from '@src/constants/currencies';

const currencyCode = Object.entries(currencies);
const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const years: number[] = [];

for (
  let i = new Date().getFullYear();
  i >= new Date().getFullYear() - 14;
  i--
) {
  years.push(i);
}

interface PropsType {
  className: string;
}

// // 보고서 조회 필터
// const dateRange = {
//   dateRange: 'CUSTOM',
//   dimensions: ['MONTH'], // DATE, WEEK,
//   startDate: {
//     day: 1,
//     month: 1,
//     year: new Date().getFullYear(),
//   },
//   endDate: {
//     day: 31,
//     month: 12,
//     year: new Date().getFullYear(),
//   },
//   metrics: ['ESTIMATED_EARNINGS', 'CLICKS', 'COST_PER_CLICK'],
//   reportingTimeZone: 'ACCOUNT_TIME_ZONE',
//   currencyCode: 'USD'
// };

export default function NotificationSelectContainer({}: PropsType) {
  return (
    <Container elName={'form'} className={'max-w-[645px] w-full'}>
      <Label className="dark:text-white">
        차원
        <Select className="p-2 rounded-md">
          <SelectOption text="주 단위" value="WEEK" />
          <SelectOption text="월 단위" value="MONTH" />
          <SelectOption text="일 단위" value="DATE" />
        </Select>
      </Label>

      {/* 보고서 조회 시작일 */}
      <Label className="dark:text-white mt-3 inline-block w-full  max-w-[645px]">
        보고서 시작일
        <Flex elName={'div'} className="flex w-full justify-between ">
          {/* 연도 */}
          <Select className=" p-2 rounded-md">
            {years.map((year) => {
              return (
                <SelectOption
                  text={year.toString()}
                  value={year.toString()}
                  key={year}
                  defaultCheck={year === new Date().getFullYear()}
                />
              );
            })}
          </Select>
          {/* 월 */}
          <Select className=" p-2 rounded-md ml-2">
            {month.map((month) => {
              return (
                <SelectOption
                  text={month.toString()}
                  value={month.toString()}
                  key={month}
                />
              );
            })}
          </Select>
          {/* 일 */}
          <Select className="p-2 rounded-md ml-2">
            {days.map((day) => {
              return (
                <SelectOption
                  text={day.toString()}
                  value={day.toString()}
                  key={day}
                />
              );
            })}
          </Select>
        </Flex>
      </Label>

      {/* 보고서 조회 종료일 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px] ">
        보고서 종료일
        <Flex elName={'div'} className="flex w-full justify-between ">
          {/* 연도 */}
          <Select className=" p-2 rounded-md">
            {years.map((year) => {
              return (
                <SelectOption
                  text={year.toString()}
                  value={year.toString()}
                  key={year}
                  defaultCheck={year === new Date().getFullYear()}
                />
              );
            })}
          </Select>
          {/* 월 */}
          <Select className=" p-2 rounded-md ml-2">
            {month.map((month) => {
              return (
                <SelectOption
                  text={month.toString()}
                  value={month.toString()}
                  key={month}
                  defaultCheck={month == 12 ? true : false}
                />
              );
            })}
          </Select>
          {/* 일 */}
          <Select className="p-2 rounded-md ml-2">
            {days.map((day) => {
              return (
                <SelectOption
                  text={day.toString()}
                  value={day.toString()}
                  key={day}
                  defaultCheck={day == 31 ? true : false}
                />
              );
            })}
          </Select>
        </Flex>
      </Label>

      {/* 보고서 조회 지표 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px]">
        지표
        <Text elementName={'span'} className="text-[0.85em] ml-3 text-gray-600">
          ※ 드래그를 통해 중복선택 가능
        </Text>
        <Select className="p-2 rounded-md mt-2 " multiple>
          <SelectOption text="광고 클릭수" value="CLICKS" />
          <SelectOption text="광고 클릭 당 수익" value="COST_PER_CLICK" />
          <SelectOption text="추정 수익금" value="ESTIMATED_EARNINGS" />
        </Select>
      </Label>

      {/* 통화 코드 */}
      <Label className="dark:text-white mt-3 inline-block w-full max-w-[645px]">
        통화 코드
        <Select className="p-2 rounded-md">
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
        className="w-full p-3 rounded-md mt-5 bg-gradient-to-br from-slate-500 to-slate-800 text-white hover:from-slate-800 hover:to-slate-500"
        type="submit"
      >
        보고서 등록
      </Button>
    </Container>
  );
}
