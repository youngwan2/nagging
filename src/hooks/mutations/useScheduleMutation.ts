'use client';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/queryKeys';
import { deleteNotificationTask } from '@src/services/schedule.service';
import toast from 'react-hot-toast';

export function useDeleteNotificationTaskMutation() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: () => deleteNotificationTask(),
    onMutate: () => {
      toast('알림 취소중.. 완료 시 알려드립니다.');
    },
    onSuccess: () => {
      toast('알림 취소 성공!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
    },
    onError: () => {
      toast.error('알림 취소 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}
