'use client';

import { commonService } from '@src/services/common.service';
import Button from '../button/Button';
import { Method } from '@src/configs/fetch.config';
import useCustomRouter from '@src/hooks/useCustomRouter';

interface PropsType {
  reportId: number;
}

export default function NotificationScheduleButtonContainer({
  reportId,
}: PropsType) {
  const { currentPageRefresh } = useCustomRouter();

  /** 알림 제거 */
  async function handleDeleteTaskNotification() {
    if (
      !confirm(
        '알림을 취소하면 현재 목록에서 제거 됩니다. 보고서 등록을 통해 재등록 하여야 합니다. 정말로 삭제하시겠습니까?',
      )
    )
      return alert('삭제를 취소하였습니다.');

    const url = '/api/notification/tasks/' + reportId;

    try {
      const result = await commonService({
        reqUrl: url,
        method: Method.DELETE,
      });
      alert(result.message ?? result.error);

      currentPageRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      onClick={handleDeleteTaskNotification}
      title="현재 등록된 알림 취소"
      className="mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      알림 취소
    </Button>
  );
}
