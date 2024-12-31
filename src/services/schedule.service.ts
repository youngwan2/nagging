import { urlConfigs } from '@src/configs/url.config';

export async function getScheduleList() {
  try {
    return (await fetch(urlConfigs.protocol + urlConfigs.host + `/api/notification/schedules`)).json();
  } catch (error) {
    console.error('알림 스케줄 조회 실패:', error);
    throw new Error('알림 스케줄 조회 실패');
  }
}

export async function deleteNotificationTask() {
  try {
    return (
      await fetch(`/api/notification/schedules`, {
        method: 'DELETE',
      })
    ).body;
  } catch (error) {
    console.error('알림 스케줄 삭제 실패:', error);
    throw new Error('알림 스케줄 삭제 실패');
  }
}
