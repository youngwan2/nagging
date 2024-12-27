'use client';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/queryKeys';
import { deleteNotificationTask } from '@src/services/schedule.service';

export function useDeleteNotificationTaskMutation() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (reportId: string) => deleteNotificationTask(reportId),
    onSuccess: (reportId: string) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.DETAILS(reportId) });
    },
  });
}
