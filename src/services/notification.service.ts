import { Method } from '@src/configs/fetch.config';

export async function immediateNotification(reportId: number) {
  try {
    const url = `/api/notification/tasks/${reportId}/immediate-notification`;
    return (
      await fetch(url, {
        method: Method.POST,
      })
    ).body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('즉시 알림 받기 실패:' + error.message);
    }
  }
}

export async function setNotificationTask(reportId: number, expression: string) {
  try {
    const url = `/api/notification/tasks/${reportId}`;
    return (
      await fetch(url, {
        method: Method.POST,
        body: JSON.stringify({ cron: expression }),
      })
    ).body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('알림 등록 실패:' + error.message);
    }
  }
}
