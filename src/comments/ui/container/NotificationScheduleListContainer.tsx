import Heading from '../heading/Heading';
import NotificationScheduleList from '../list/NotificationScheduleList';
import Text from '../text/Text';
import Container from './Container';
import ErrorMessage from '../message/ErrorMessage';
import EmptyMessage from '../message/EmptyMessage';

import ScheduleCardSkeleton from '../skeleton/ScheduleCardSkeleton';
import { Method } from '@src/configs/fetch.config';
import useFetchQuery from '@src/hooks/queries/useFetchQuery';
import { QUERY_KEYS } from '@src/hooks/queries/queryKeys';

export default function NotificationScheduleListContainer() {
  const scheduleListReqOptions = {
    reqUrl: '/api/notification/schedules',
    method: Method.GET,
  };

  // 등록된 스케줄(보고서 알림)
  const { data: schedules, isPending, isError } = useFetchQuery(scheduleListReqOptions, QUERY_KEYS.SCHEDULE.LIST);

  return (
    <Container elName={'section'} className="mt-16 w-full">
      {/* 타이틀 */}
      <Title />

      {/* 안내 메시지 */}
      <Text elementName={'p'} className="text-sm text-gray-600 mb-4">
        ※ 원활한 서비스 운영을 위해 현재는 하나의 알림 등록만 가능합니다.
      </Text>

      {/* 목록 */}
      {!schedules || (schedules.message && <EmptyMessage />)}
      {isPending ? (
        <ScheduleCardSkeleton />
      ) : !isError ? (
        <NotificationScheduleList items={schedules} />
      ) : (
        <ErrorMessage />
      )}
    </Container>
  );
}

function Title() {
  return (
    <Heading level="2" className="pb-[0.75em]">
      알림 스케줄 목록
      <Text elementName={'span'} className="text-[0.55em] pl-4 text-gray-500 opacity-55">
        Notification Schedule List
      </Text>
    </Heading>
  );
}

interface NotificationReport {
  reportId: number;
  userId: string;
  report: string;
  createdAt: Date;
  updatedAt: Date;
  task: boolean;
}

interface Schedule {
  notificationReports: NotificationReport;
  createdAt: string;
  cronExpression: string;
}

interface NextScheduleInfo {
  nextReminder: string;
  subsequentReminder: string;
}

interface UserNextScheduleInfo {
  reportId: number;
  nextScheduleInfo: NextScheduleInfo;
}

export interface ScheduleList {
  scheduleList: Schedule[];
  nextScheduleInfo: { [key: string]: UserNextScheduleInfo };
}
