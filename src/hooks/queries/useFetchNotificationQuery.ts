import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getNotificationOptionList } from '@src/services/notification.service';

export function useFetchNotificationOptionQuery(page: number) {
  return useQuery({
    queryKey: QUERY_KEYS.REPORT.PER_PAGE(page),
    queryFn: () => getNotificationOptionList(page),
    retry: 2,
    placeholderData: keepPreviousData,
  });
}
