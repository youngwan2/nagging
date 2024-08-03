'use client';

import { useState } from 'react';
import useQueryReact from '@src/hooks/useQueryReact';

import Container from './Container';
import NotificationOptionFormContainer from './NotificationOptionFormContainer';
import NotificationScheduleListContainer from './NotificationScheduleListContainer';
import NotificationOptionListContainer from './NotificationOptionListContainer';

import { Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';

// 타입 정의
export interface QueryState {
  data: any;
  isPending: boolean;
  isRefetching: boolean;
  isError: boolean;
}

interface PropsType {
  userId?: string;
  token: string;
}

const initialPage = 1;
const FlexCellGroup = Container;
export default function NotificationPageContainer({
  userId,
  token,
}: PropsType) {
  const [page, setPage] = useState(1);

  const options = {
    reqUrl: '/api/notification/reports?page=' + page,
    method: Method.GET,
  };

  const scheduleListReqOptions = {
    reqUrl:
      urlConfigs.protocol + urlConfigs.host + '/api/notification/schedules',
    method: Method.GET,
    token,
  };

  const { data, isPending, isError, isRefetching } = useQueryReact(
    options,
    'reports',
    page,
  );
  const {
    data: scheduleData,
    isPending: scheduleIsPending,
    isRefetching: scheduleIsRefeching,
    isError: scheduleIsError,
  } = useQueryReact(scheduleListReqOptions, 'schedules');

  function onPageChange(page: number) {
    setPage(page);
  }

  const reportOptionDataType = generateQueryState({
    data,
    isPending,
    isRefetching,
    isError,
  });
  const scheduleType = generateQueryState({
    data: scheduleData,
    isPending: scheduleIsPending,
    isRefetching: scheduleIsRefeching,
    isError: scheduleIsError,
  });

  return (
    <Container
      elName={'div'}
      className="w-full relative flex xl:flex-row flex-col justify-between"
    >
      <FlexCellGroup elName={'div'} className="w-full">
        {/* 보고서 설정 */}
        <NotificationOptionFormContainer userId={userId} />
        {/* 알림 예약*/}
        <NotificationScheduleListContainer queryState={scheduleType} />
      </FlexCellGroup>

      {/* 생성한 보고서 옵션 내역 */}
      <NotificationOptionListContainer
        queryState={reportOptionDataType}
        onPageChange={onPageChange}
        page={initialPage}
      />
    </Container>
  );
}

function generateQueryState({
  data,
  isPending,
  isRefetching,
  isError,
}: QueryState): QueryState {
  return {
    data,
    isPending,
    isRefetching,
    isError,
  };
}
