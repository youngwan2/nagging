'use client';

import { useQueryClient } from '@tanstack/react-query';

/**
 * 쿼리 키와 일치하는 오래된 데이터(캐시)를 새 데이터로 교체
 * @param queryKey 재유효화 대상 쿼리 키
 */
export default function useQueryInvalidate(...queryKey: any[]) {
  const queryClient = useQueryClient();

  return {
    onInvalidateQuery: () =>
      queryClient.invalidateQueries({ queryKey: queryKey }),
  };
}
