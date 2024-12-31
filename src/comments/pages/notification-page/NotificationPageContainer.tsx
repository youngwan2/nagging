'use client';

import Container from '../../ui/container/Container';
import NotificationOptionFormContainer from './NotificationOptionFormContainer';
import NotificationScheduleListContainer from './NotificationScheduleListContainer';
import NotificationOptionListContainer from './NotificationOptionListContainer';
import FlexBox from '../../ui/wrapper/FlexBox';
import { usePageState } from '@src/store/notificationStore';

interface PropsType {
  userId?: string;
  token: string;
}

export default function NotificationPageContainer({ userId }: PropsType) {
  const { page, setPage } = usePageState();

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
        <NotificationScheduleListContainer />
      </FlexBox>

      {/* 보고서 옵션 목록*/}
      <NotificationOptionListContainer userId={userId} onPageChange={onPageChange} page={page} />
    </Container>
  );
}
