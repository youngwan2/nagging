'use client';
import { HTMLAttributes } from 'react';
import Button from '../button/Button';
import { everyMonth, everyWeek } from '@src/constants/cron';
import { ReportRequest } from '../../../../lib/adsense';
import { useDateRange } from '@src/store/dateRangeStore';

interface PropsType extends HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  token?: string;
  userId?: string;
}

export default function NotificationForm({ userId, ...props }: PropsType) {
  const dateRange = useDateRange.getState().dateRange;

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <Button
        onClick={() => {
          handleSetCron(everyMonth, userId, dateRange);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        매월 1일 보고서 예약
      </Button>
      <Button
        onClick={() => {
          handleSetCron(everyWeek, userId, dateRange);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        매주 월요일 보고서 받기
      </Button>

      {/* 1분뒤 보고서 받기 취소 */}
      <Button
        onClick={() => {
          handleSetCron(
            `${new Date().getMinutes() + 1} ${new Date().getHours().toString()} * * *`,
            userId,
            dateRange,
          );
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        1분 뒤 알림
      </Button>

      {/* 보고서 받기 취소 */}
      <Button
        onClick={() => {
          handleStopCron(userId);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        알림 취소
      </Button>
    </form>
  );
}

/** 예약 알림 등록 */
async function handleSetCron(
  cron: string,
  userId: string = '',
  dateRange: ReportRequest,
) {
  if (userId.length < 2) return alert('사용권한이 없습니다.');

  const url = '/api/notification/jobs';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ cron, userId, dateRange }),
  });
  if (!response.ok) throw new Error('알림 예약 실패');
  const result = await response.json();
  console.log(result);
}

/** 예약 알림 취소 */
async function handleStopCron(userId: string = '') {
  if (userId.length < 2) return alert('사용권한이 없습니다.');

  const url = '/api/notification/cron';
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
  });
  if (response.status === 404) return alert('등록된 알림이 없습니다.');
  if (!response.ok) throw new Error('알림 취소 실패');
  const result = await response.json();
  console.log(result);
}

// /** 이메일 전송 */
// async function onSendEmail(userId: string = '') {
//   if (userId.length < 2) return alert('사용권한이 없습니다.');

//   const url = '/api/notification/email';
//   const response = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({ userId }),
//   });
//   if (!response.ok) throw new Error('이메일 전송 실패');
//   const result = await response.json();
//   console.log(result);
// }
