'use client';

import { useEffect, useState } from 'react';
import useQueryReact from '@src/hooks/useQueryReact';

import Container from './Container';
import NotificationOptionFormContainer from './NotificationOptionFormContainer';
import NotificationScheduleListContainer from './NotificationScheduleListContainer';
import NotificationOptionListContainer from './NotificationOptionListContainer';
import FlexBox from '../wrapper/FlexBox';

import { Method } from '@src/configs/fetch.config';
import { useRefetchTrigger } from '@src/store/triggerStore';

interface PropsType {
  userId?: string;
  token: string;
}

const initialPage = 1;
export default function NotificationPageContainer({ userId, token }: PropsType) {
  const [page, setPage] = useState(1);
  const { isRefetch, setIsRefetch } = useRefetchTrigger();

  const reportOptionListOptions = {
    reqUrl: '/api/notification/reports?page=' + page,
    method: Method.GET,
  };

  const scheduleListReqOptions = {
    reqUrl: '/api/notification/schedules',
    method: Method.GET,
    token,
  };

  // 생성된 보고서 옵션 목록
  const {
    data,
    isPending,
    isError,
    isRefetching,
    refetch: reportListRefetch,
  } = useQueryReact(reportOptionListOptions, 'reports', page);

  // 등록된 스케줄(보고서 알림)
  const {
    data: scheduleData,
    isPending: scheduleIsPending,
    isRefetching: scheduleIsRefeching,
    isError: scheduleIsError,
    refetch: scheduleListRefetch,
  } = useQueryReact(scheduleListReqOptions, 'schedules');

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

  // 페이지 변경
  function onPageChange(page: number) {
    setPage(page);
  }

  async function refetchTrigger() {
    await scheduleListRefetch();
    await reportListRefetch();
  }

  useEffect(() => {
    if (isRefetch) {
      refetchTrigger().then(() => {
        setIsRefetch(false);
      });
    }
  }, [isRefetch]);

  return (
    <Container
      elName={'div'}
      className="w-full relative flex xl:flex-row flex-col justify-between"
    >
      <FlexBox className="w-full flex-col items-start">
        {/* 보고서 설정 */}
        <NotificationOptionFormContainer userId={userId} />
        {/* 알림 스케줄 목록*/}
        <NotificationScheduleListContainer queryState={scheduleType} />
      </FlexBox>

      {/* 보고서 옵션 목록*/}
      <NotificationOptionListContainer
        userId={userId}
        queryState={reportOptionDataType}
        onPageChange={onPageChange}
        page={initialPage}
      />
    </Container>
  );
}
/**
 * react-query 로 받아온 데이터 및 상태를 묶어서 props으로 전달하는 용도로 사용
 */
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

// 타입 정의
export interface QueryState {
  data: any;
  isPending: boolean;
  isRefetching: boolean;
  isError: boolean;
}
