'use client';

import { commonService } from '@src/services/common.service';
import Button from '../button/Button';
import { Method } from '@src/configs/fetch.config';
import { useState } from 'react';
import useQueryInvalidate from '@src/hooks/useQueryInvalidate';

interface PropsType {
  reportId: number;
}
export default function NotificationScheduleButtonContainer({
  reportId,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const { onInvalidateQuery } = useQueryInvalidate('schedules');
  const { onInvalidateQuery: onReportInvlidateQuery } =
    useQueryInvalidate('reports');

  /** 알림 제거 */
  async function handleDeleteTaskNotification() {
    setIsLoading(true);
    if (
      !confirm(
        `알림을 취소하면 보고서 식별코드: ${reportId} 에 해당하는 보고서 알림이 현재 목록에서 제거 됩니다. 정말로 취소 하시겠습니까?`,
      )
    ) {
      setIsLoading(false);
      return alert('삭제를 취소하였습니다.');
    }

    const url = '/api/notification/tasks/' + reportId;

    try {
      const result = await commonService({
        reqUrl: url,
        method: Method.DELETE,
      });
      alert(result.message ?? result.error);
      onInvalidateQuery();
      onReportInvlidateQuery();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleDeleteTaskNotification}
      title="현재 등록된 알림 취소"
      className="mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      {isLoading ? '취소중...' : '알림 취소'}
    </Button>
  );
}
