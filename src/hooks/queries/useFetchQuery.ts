'use client';
import { Method } from '@src/configs/fetch.config';
import { defaultOptions } from '@src/configs/tanstack.config';
import { commonService } from '@src/services/common.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface CommonServiceProps {
  reqUrl: string;
  method: Method;
  token?: string;
  body?: any;
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchInterval?: number;
    retry?: number;
  };
}

export default function useFetchQuery(
  { reqUrl, method, token, body, options = defaultOptions }: CommonServiceProps,
  ...key: any[]
) {
  return useQuery({
    queryKey: key,
    queryFn: () =>
      commonService({
        reqUrl,
        method,
        token,
        body,
      }),
    placeholderData: keepPreviousData,
    ...options,
    refetchOnMount: true,
  });
}
