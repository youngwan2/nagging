import Heading from '../heading/Heading';
import NotificationScheduleList from '../list/NotificationScheduleList';
import Text from '../text/Text';
import CardSkeleton from '../skeleton/CardSkeleton';
import { QueryState } from './NotificationPageContainer';
import Container from './Container';

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

interface PropsType {
  queryState: QueryState;
}

export default function NotificationScheduleListContainer({
  queryState,
}: PropsType) {
  const { data, isError, isPending, isRefetching } = queryState;

  return (
    <Container elName={'section'} className="mt-16">
      <Heading level="2" className="pb-[0.75em]">
        알림 스케줄 목록
        <Text
          elementName={'span'}
          className="text-[0.55em] pl-4 text-gray-500 opacity-55"
        >
          Notification Schedule List
        </Text>
      </Heading>
      <Text elementName={'p'} className="text-sm text-gray-600 mb-4">
        ※ 원활한 서비스 운영을 위해 중복 등록은 불가능합니다.
      </Text>
      {/* 목록 */}
      {isPending || isRefetching ? (
        <CardSkeleton orientation="horizontal" />
      ) : !isError ? (
        <NotificationScheduleList items={data} />
      ) : (
        <Text elementName={'p'}>
          네트워크 문제로 데이터를 불러오지 못했습니다. 나중에 다시시도
          해주세요.
        </Text>
      )}
    </Container>
  );
}
