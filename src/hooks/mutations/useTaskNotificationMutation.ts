import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/queryKeys';
import { immediateNotification, setNotificationTask } from '@src/services/notification.service';
import toast from 'react-hot-toast';
import { usePageState } from '@src/store/notificationStore';
import { deleteNotificationTask } from '@src/services/schedule.service';

// 즉시 알림 받기
export function useImmediateNotificationMutation() {
  const { page } = usePageState();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: number) => immediateNotification(reportId),
    onMutate: () => {
      toast('✈ 전송중.. 완료 시 알려드립니다.');
    },
    onSuccess: () => {
      toast.success('전송 성공. 메일을 확인해 주세요.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT.PER_PAGE(page) });
    },
    onError: () => {
      toast.error('전송 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}

// 알림 생성
export function useCreateNotificationMutation() {
  const queryClient = useQueryClient();
  const { page } = usePageState();
  return useMutation({
    mutationFn: ({ reportId, expression }: { reportId: number; expression: string }) =>
      setNotificationTask(reportId, expression),
    onMutate: () => {
      toast(' 설정중.. 완료시 알려드립니다.');
    },
    onSuccess: () => {
      toast.success('설정 성공. 이제 변경된 간격으로 알림이 전송 됩니다.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT.PER_PAGE(page) });
    },
    onError: () => {
      toast.error('설정 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}

// 알림 삭제
export function useDeleteNotificationTaskMutation() {
  const { page } = usePageState(); // 보고서 옵션 목록 페이지 정보
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNotificationTask(),
    onMutate: () => {
      toast('알림 취소 완료 시 알려드립니다.');
    },
    onSuccess: () => {
      toast.success('취소 성공');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHEDULE.LIST });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT.PER_PAGE(page) });
    },
    onError: () => {
      toast.error('알림 취소 실패! 잠시 후 다시 시도해주세요.');
    },
  });
}
