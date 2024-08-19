'use client';

import usePromiseToast from '@src/hooks/usePromiseToast';

import Button from '../button/Button';

import { Method } from '@src/configs/fetch.config';
import { commonService } from '@src/services/common.service';
import { useRefetchTrigger } from '@src/store/triggerStore';

interface PropsType {
  reportId: string;
}
export default function NotificationScheduleButtonContainer({ reportId }: PropsType) {
  const { toastState, setToastState } = usePromiseToast();
  const { setIsRefetch } = useRefetchTrigger();

  /** 알림 제거 */
  async function handleDeleteTaskNotification() {
    if (
      !confirm(
        `알림을 취소하면 보고서 식별코드: ${reportId} 에 해당하는 보고서 알림이 현재 목록에서 제거 됩니다. 정말로 취소 하시겠습니까?`,
      )
    ) {
      return alert('삭제를 취소하였습니다.');
    }

    const url = '/api/notification/tasks/' + reportId;

    try {
      commonService({
        reqUrl: url,
        method: Method.DELETE,
      }).then(() => {
        setIsRefetch(true);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      disabled={toastState.isActive}
      onClick={() => {
        setToastState({
          func: handleDeleteTaskNotification,
          loading: '취소중..',
          success: '취소 완료',
          error: '취소 실패',
          isActive: true,
        });
      }}
      title="현재 등록된 알림 취소"
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      {toastState.isActive ? '취소중...' : '알림 취소'}
    </Button>
  );
}
