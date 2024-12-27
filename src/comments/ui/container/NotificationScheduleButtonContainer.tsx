'use client';

import { useDeleteNotificationTaskMutation } from '@src/hooks/mutations/useScheduleMutation';
import Button from '../button/Button';

interface PropsType {
  reportId: string;
}
export default function NotificationScheduleButtonContainer({ reportId }: PropsType) {
  const { mutate, isPending } = useDeleteNotificationTaskMutation();

  /** 알림 제거 */
  async function handleDeleteTaskNotification(reportId: string) {
    if (
      !confirm(
        `알림을 취소하면 보고서 식별코드: ${reportId} 에 해당하는 보고서 알림이 현재 목록에서 제거 됩니다. 정말로 취소 하시겠습니까?`,
      )
    ) {
      mutate(reportId);
    }
  }

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        handleDeleteTaskNotification(reportId);
      }}
      title="현재 등록된 알림 취소"
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      {isPending ? '삭제중...' : '알림 취소'}
    </Button>
  );
}
