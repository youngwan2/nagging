'use client';

import { useState } from 'react';

import Container from './Container';
import NotificationOptionFormContainer from './NotificationOptionFormContainer';
import NotificationScheduleListContainer from './NotificationScheduleListContainer';
import NotificationOptionListContainer from './NotificationOptionListContainer';
import FlexBox from '../wrapper/FlexBox';

interface PropsType {
  userId?: string;
  token: string;
}

const initialPage = 1;
export default function NotificationPageContainer({ userId, token }: PropsType) {
  const [page, setPage] = useState(initialPage);

  // 페이지 변경
  function onPageChange(page: number) {
    setPage(page);
  }

  return (
    <Container elName={'div'} className="w-full relative flex xl:flex-row flex-col justify-between">
      <FlexBox className="w-full flex-col items-start">
        {/* 보고서 설정 */}
        <NotificationOptionFormContainer userId={userId} />
        {/* 알림 스케줄 목록*/}
        <NotificationScheduleListContainer token={token} />
      </FlexBox>

      {/* 보고서 옵션 목록*/}
      <NotificationOptionListContainer userId={userId} onPageChange={onPageChange} page={page} />
    </Container>
  );
}

// 타입 정의
export interface QueryState {
  data: any;
  isPending: boolean;
  isRefetching: boolean;
  isError: boolean;
}
