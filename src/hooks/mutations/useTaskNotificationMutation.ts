import { QueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/queryKeys';
import { immediateNotification, setNotificationTask } from '@src/services/notification.service';
import toast from 'react-hot-toast';

// 즉시 알림 받기
export function useImmediateNotificationMutation() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (reportId: number) => immediateNotification(reportId),
    onMutate: () => {
      toast('✈ 전송중.. 완료 시 알려드립니다.');
    },
    onSuccess: () => {
      toast('전송 성공! 메일을 확인해 주세요.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
    },
    onError: () => {
      toast.error('전송 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}

export function useCreateNotificationMutation() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ reportId, expression }: { reportId: number; expression: string }) =>
      setNotificationTask(reportId, expression),
    onMutate: () => {
      toast(' 설정중.. 완료시 알려드립니다.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
    },
    onSuccess: () => {
      toast('설정 성공! 이제 변경된 간격으로 알림이 전송 됩니다.');
    },
    onError: () => {
      toast.error('설정 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}
