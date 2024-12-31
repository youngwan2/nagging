import { auth } from '../../../../lib/auth';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotificationPageContainer from '@src/comments/pages/notification-page/NotificationPageContainer';

import { QUERY_KEYS } from '@src/hooks/queries/queryKeys';
import { getNotificationOptionList } from '@src/services/notification.service';
import { getScheduleList } from '@src/services/schedule.service';

const initialPage = 1;

export default async function page() {
  const session = await auth();
  const userId = session?.userId;
  const token = session?.access_token || '';

  const queryClient = new QueryClient();

  // 보고서 옵션 및 스케줄 목록을 미리 페칭
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.REPORT.PER_PAGE(initialPage),
    queryFn: await getNotificationOptionList(initialPage),
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.SCHEDULE.LIST,
    queryFn: await getScheduleList(),
  });

  return (
    <HydrationBoundary>
      <NotificationPageContainer userId={userId} token={token} />
    </HydrationBoundary>
  );
}
