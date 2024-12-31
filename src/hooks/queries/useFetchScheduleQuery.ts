import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getScheduleList } from '@src/services/schedule.service';

export function useFetchScheduleQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.SCHEDULE.LIST,
    queryFn: () => getScheduleList(),
  });
}
