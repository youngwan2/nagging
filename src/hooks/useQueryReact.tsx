'use client';
import { Method } from '@src/configs/fetch.config';
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
export const defaultOptions = {
  enabled: true,
  staleTime: 1000 * 60 * 5, // 5 minutes
  refetchInterval: 1000 * 60 * 15, // 15 minutes
  retry: 3,
};

export default function useQueryReact(
  { reqUrl, method, token, body, options = defaultOptions }: CommonServiceProps,
  ...key: any[]
) {
  const { ...props } = useQuery({
    queryKey: key,
    queryFn: () => commonService({ reqUrl, method, token, body }),
    placeholderData: keepPreviousData,
    ...options,
  });

  return { ...props };
}
