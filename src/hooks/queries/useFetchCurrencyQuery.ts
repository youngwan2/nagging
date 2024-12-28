import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getCurrencyByUsd } from '@src/services/currency.service';

export function useFetchCurrencyQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENCY.LIST,
    queryFn: getCurrencyByUsd,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
