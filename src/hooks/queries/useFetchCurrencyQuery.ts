import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getCurrencyByUsd, getExchangeRateTimelineByUsd } from '@src/services/currency.service';

export function useFetchCurrencyQuery(date?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENCY.LIST,
    queryFn: () => getCurrencyByUsd(date),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
}

export function useFetchExchangeRateTimeline(dates: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENCY.TIMELINE_LIST,
    queryFn: () => getExchangeRateTimelineByUsd(dates),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
