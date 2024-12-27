export async function deleteNotificationTask(_reportId: string) {
  console.log('알림이 취소된 보고서:', _reportId);
  try {
    return (
      await fetch(`/api/notification/schedules`, {
        method: 'DELETE',
      })
    ).body;
  } catch (error) {
    console.error('알람 삭제 실패:', error);
    throw new Error('알림 삭제 실패');
  }
}
