import Heading from '../../ui/heading/Heading';
import NotificationScheduleList from './NotificationScheduleList';
import Text from '../../ui/text/Text';
import Container from '../../ui/container/Container';
import ErrorMessage from '../../ui/message/ErrorMessage';
import EmptyMessage from '../../ui/message/EmptyMessage';
import Button from '@src/comments/ui/button/Button';

import ScheduleCardSkeleton from '../../ui/skeleton/ScheduleCardSkeleton';
import { useFetchScheduleQuery } from '@src/hooks/queries/useFetchScheduleQuery';

import { MdRefresh } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function NotificationScheduleListContainer() {
  // 등록된 스케줄(보고서 알림)
  const { data, isPending, isError, refetch } = useFetchScheduleQuery();

  function onRefresh() {
    if (Array.isArray(data.scheduleList)) {
      if (data.scheduleList.length < 1) return toast('알림 스케줄이 존재하지 않습니다.');
      else {
        refetch().then(() => toast('알림 스케줄 목록이 갱신 되었습니다.'));
      }
    }
    return toast('알림 스케줄이 존재하지 않습니다.');
  }
  return (
    <Container elName={'section'} className="mt-16 w-full">
      <div className="flex justify-between items-center">
        <Title />
        <Button
          onClick={onRefresh}
          ariaLabel="알림 스케줄 갱신"
          title="갱신하기"
          className="p-1 text-[1.25rem] hover:text-[#3B87F2]"
        >
          {' '}
          <MdRefresh />{' '}
        </Button>
      </div>
      <Text elementName={'p'} className="text-sm text-gray-600 mb-4">
        ※ 원활한 서비스 운영을 위해 현재는 하나의 알림 등록만 가능합니다.
      </Text>

      {/* 목록 */}
      {!data || (data.message && <EmptyMessage />)}
      {isPending ? <ScheduleCardSkeleton /> : !isError ? <NotificationScheduleList items={data} /> : <ErrorMessage />}
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
