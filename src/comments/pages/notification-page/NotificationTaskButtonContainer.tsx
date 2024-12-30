'use client';

import {
  useCreateNotificationMutation,
  useImmediateNotificationMutation,
} from '@src/hooks/mutations/useTaskNotificationMutation';

import Button from '../../ui/button/Button';
import Text from '../../ui/text/Text';
import Container from '../../ui/container/Container';
import FlexBox from '../../ui/wrapper/FlexBox';
import { cronOptions } from '@src/constants/cron';
import { useAdsenseAuthState } from '@src/store/adsenseAuthStore';
import toast from 'react-hot-toast';

interface PropsType {
  reportId: number;
  onDeleteReportSubmit: (postId: number) => void;
}

export default function NotificationTaskButtonContainer({ reportId, onDeleteReportSubmit }: PropsType) {
  const { mutate: immediateMutate, isPending } = useImmediateNotificationMutation();
  const { mutate: createMutate, isPending: isCreateNotificationPending } = useCreateNotificationMutation();

  const { hasUserAdsenseId } = useAdsenseAuthState();

  /** 보고서 삭제 */
  async function handleDeleteReportOption(reportId: number) {
    const isDelete = confirm(
      '보고서를 삭제하시겠습니까? 삭제 시 알림은 [알림 예약 목록]에서 별도로 취소하셔야 합니다.',
    );
    if (!isDelete) return alert('삭제 요청을 취소하였습니다.');
    onDeleteReportSubmit(reportId);
  }

  /** 보고서 알림 즉시 받기 */
  async function handleImmediateReport(reportId: number) {
    if (!hasUserAdsenseId)
      return toast('알림 서비스는 우측 상단의 사용자 아이콘 우측의 [AD조회] 후 이용이 가능합니다.');
    immediateMutate(reportId);
  }

  /** 보고서 알림 등록 */
  async function handleCreateTaskNotification(expression: string) {
    if (!hasUserAdsenseId)
      return toast('알림 서비스는 우측 상단의 사용자 아이콘 우측의 [AD조회] 후 이용이 가능합니다.');
    createMutate({ reportId, expression });
  }

  return (
    <>
      <SettingsContainer title="정기 알림 설정">
        <ButtonGroup
          options={cronOptions}
          onClick={handleCreateTaskNotification}
          isPending={isCreateNotificationPending}
        />
      </SettingsContainer>

      <SettingsContainer title="일회성 알림 설정">
        <FlexBox className="flex items-center">
          <Button
            title="즉시 보고서 알림 받기"
            onClick={() => {
              handleImmediateReport(reportId);
            }}
            className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
          >
            {isPending ? '처리중' : '즉시 받기'}
          </Button>
        </FlexBox>
      </SettingsContainer>

      <SettingsContainer title="보고서 삭제">
        <FlexBox className="flex items-center">
          <Button
            onClick={() => handleDeleteReportOption(reportId)}
            className="border mx-1 bg-red-500 text-white hover:bg-red-600 rounded-md p-1"
          >
            {'보고서 삭제'}
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
  options,
  onClick,
  isPending,
}: {
  options: Array<{ label: string; expression: string; title: string }>;
  onClick: (expression: string) => void;
  isPending: boolean;
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
          {isPending ? '처리중' : option.label}
        </Button>
      ))}
    </FlexBox>
  );
}
