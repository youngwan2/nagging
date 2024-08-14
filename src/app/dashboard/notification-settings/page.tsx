import { auth } from '@src/auth';

import { Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';
import { commonService } from '@src/services/common.service';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotificationPageContainer from '@src/comments/ui/container/NotificationPageContainer';

export interface UserReportOptionList {
  reportId: number;
  userId: string;
  task: boolean;
  report: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReportOptionInfo {
  optionList: UserReportOptionList[];
  totalCount: number;
  maxPage: number;
}

const options = {
  reqUrl:
    urlConfigs.protocol + urlConfigs.host + '/api/notification/reports?page=1',
  method: Method.GET,
};

const initialPage = 1;

export default async function page() {
  const session = await auth();
  const userId = session?.userId;
  const token = session?.access_token || '';

  const queryClient = new QueryClient();

  const scheduleListReqOptions = {
    reqUrl:
      urlConfigs.protocol + urlConfigs.host + '/api/notification/schedules',
    method: Method.GET,
    token,
  };

  await queryClient.prefetchQuery({
    queryKey: ['reports', initialPage],
    queryFn: await commonService(options),
  });

  await queryClient.prefetchQuery({
    queryKey: ['schedules'],
    queryFn: await commonService(scheduleListReqOptions),
  });

  return (
    <HydrationBoundary>
      <NotificationPageContainer userId={userId} token={token} />
    </HydrationBoundary>
  );
}
