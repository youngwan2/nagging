'use client';

import { useQueryClient } from '@tanstack/react-query';
export default function useQueryInvalidate(...queryKey: any[]) {
  const queryClient = useQueryClient();

  return {
    onInvalidateQuery: () =>
      queryClient.invalidateQueries({ queryKey: queryKey }),
  };
}
