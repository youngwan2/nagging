'use client';
import { HTMLAttributes } from 'react';
import Button from '../button/Button';
import { urlConfigs } from '@src/configs/url.config';

interface PropsType extends HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  token?: string;
  userId?: string;
}

export default function NotificationForm({ userId, ...props }: PropsType) {
  /** 예약 알림 등록 */
  async function onSetCron(cron: string, userId: string = '') {
    if (userId.length < 2) return alert('사용권한이 없습니다.');

    const url =
      urlConfigs.protocol + urlConfigs.host + '/api/notification/cron';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ cron, userId }),
    });
    if (!response.ok) throw new Error('알림 예약 실패');
    const result = await response.json();
    console.log(result);
  }

  /** 예약 알림 취소 */
  async function onStopCron(userId: string = '') {
    if (userId.length < 2) return alert('사용권한이 없습니다.');

    const url =
      urlConfigs.protocol + urlConfigs.host + '/api/notification/cron';
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    });
    if (response.status === 404) return alert('등록된 알림이 없습니다.');
    if (!response.ok) throw new Error('알림 취소 실패');
    const result = await response.json();
    console.log(result);
  }

  //
  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <Button
        onClick={() => {
          onSetCron(` */5 * * * * *`, userId);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        매월 1일 보고서 받기
      </Button>
      <Button
        onClick={() => {
          onSetCron(`0 0 * * 1`, userId);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        매주 월요일 보고서 받기
      </Button>

      {/* 테스트 */}
      <Button
        onClick={() => {
          onSetCron(`*/1 * * * * *`, userId);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        초단위 크론 실행
      </Button>

      {/* 알림 취소 */}
      <Button
        onClick={() => {
          onStopCron(userId);
        }}
        className="p-3 m-3 border rounded-md bg-[rgba(0,0,0,0.2)]"
      >
        알림 취소
      </Button>
    </form>
  );
}
