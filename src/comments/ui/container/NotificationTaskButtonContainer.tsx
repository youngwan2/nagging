'use client';

import { useState } from 'react';
import usePromiseToast from '@src/hooks/usePromiseToast';

import Button from '../button/Button';
import Text from '../text/Text';
import Container from './Container';
import FlexBox from '../wrapper/FlexBox';

import { Method } from '@src/configs/fetch.config';

import { everyMonth, everyWeek, everyYear } from '@src/constants/cron';
import { commonService } from '@src/services/common.service';
import { useRefetchTrigger } from '@src/store/triggerStore';

interface PropsType {
  reportId: number;
}

export default function NotificationTaskButtonContainer({ reportId }: PropsType) {
  const { setToastState } = usePromiseToast();
  const { setIsRefetch } = useRefetchTrigger();
  const [isLoading, setIsLoading] = useState(false);

  /** 보고서 삭제 */
  async function handleDeleteReportOption() {
    const isDelete = confirm(
      '보고서를 삭제하시겠습니까? 삭제 시 알림은 [알림 예약 목록]에서 별도로 취소하셔야 합니다.',
    );
    if (!isDelete) return alert('삭제 요청을 취소하였습니다.');
    const url = `/api/notification/reports/${reportId}`;

    try {
      commonService({
        reqUrl: url,
        method: Method.DELETE,
      }).then(() => setIsRefetch(true));
    } catch (error) {
      console.error(error);
    }
  }

  /** 즉시 받기 */
  async function handleImmediateReport() {
    const url = `/api/notification/tasks/${reportId}?immediate=true`;

    try {
      commonService({
        reqUrl: url,
        method: Method.POST,
      }).then(() => setIsRefetch(true));
    } catch (error) {
      console.error(error);
    }
  }

  /** 작업 등록 */
  async function handleCreateTaskNotification(expression: string) {
    setIsLoading(true);
    const url = `/api/notification/tasks/${reportId}`;

    try {
      commonService({
        reqUrl: url,
        method: Method.POST,
        body: { cron: expression },
      }).then(() => setIsRefetch(true));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const scheduleOptions = [
    {
      label: '주 단위',
      expression: everyWeek,
      title: '매주 월요일 오전 06:00 정기 보고',
    },
    {
      label: '월 단위',
      expression: everyMonth,
      title: '매월 첫째주 1일 오전 06:00 정기 보고',
    },
    {
      label: '년 단위',
      expression: everyYear,
      title: '매년 1월 1일 오전 06:00 정기 보고',
    },
  ];

  return (
    <>
      <SettingsContainer title="정기 알림 설정">
        <ButtonGroup isLoading={isLoading} options={scheduleOptions} onClick={handleCreateTaskNotification} />
      </SettingsContainer>

      <SettingsContainer title="일회성 알림 설정">
        <FlexBox className="flex items-center">
          <Button
            title="5초 뒤 1회"
            onClick={() => {
              setToastState({
                func: handleImmediateReport,
                success: '전송 완료',
                error: '전송 실패',
                loading: '전송중..',
                isActive: true,
              });
            }}
            className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
          >
            즉시 받기
          </Button>
        </FlexBox>
      </SettingsContainer>

      <SettingsContainer title="보고서 삭제">
        <FlexBox className="flex items-center">
          <Button
            onClick={() => {
              setToastState({
                func: handleDeleteReportOption,
                success: '삭제 완료',
                error: '삭제 실패',
                loading: '삭제중..',
                isActive: true,
              });
            }}
            className="border mx-1 bg-red-500 text-white hover:bg-red-600 rounded-md p-1"
          >
            보고서 삭제
          </Button>
        </FlexBox>
      </SettingsContainer>
    </>
  );
}

function SettingsContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Container elName="div" className="flex flex-col mt-[0.5rem]">
      <Text elementName="span" className="p-1 font-light text-[0.85em]">
        {title}
      </Text>
      {children}
    </Container>
  );
}

function ButtonGroup({
  isLoading,
  options,
  onClick,
}: {
  isLoading: boolean;
  options: Array<{ label: string; expression: string; title: string }>;
  onClick: (expression: string) => void;
}) {
  return (
    <FlexBox className="flex items-center">
      {options.map((option) => (
        <Button
          key={option.expression}
          onClick={() => onClick(option.expression)}
          title={option.title}
          className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
        >
          {isLoading ? '처리중..' : option.label}
        </Button>
      ))}
    </FlexBox>
  );
}
