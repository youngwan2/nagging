import { auth } from '../../../../lib/auth';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotificationPageContainer from '@src/comments/ui/container/NotificationPageContainer';

import { commonService } from '@src/services/common.service';
import { Method } from '@src/configs/fetch.config';
import { QUERY_KEYS } from '@src/hooks/queries/queryKeys';

const initialPage = 1;

export default async function page() {
  const session = await auth();
  const userId = session?.userId;
  const token = session?.access_token || '';

  const queryClient = new QueryClient();

  const options = {
    reqUrl: '/api/notification/reports?page=1',
    method: Method.GET,
  };

  const scheduleListReqOptions = {
    reqUrl: '/api/notification/schedules',
    method: Method.GET,
    token,
  };

  // 보고서 옵션 및 스케줄 목록을 미리 페칭
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.REPORT.PER_PAGE(initialPage),
    queryFn: await commonService(options),
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.SCHEDULE.LIST,
    queryFn: await commonService(scheduleListReqOptions),
  });

  return (
    <HydrationBoundary>
      <NotificationPageContainer userId={userId} token={token} />
    </HydrationBoundary>
  );
}
