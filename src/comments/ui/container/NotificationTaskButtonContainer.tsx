'use client';

import { commonService } from '@src/services/common.service';
import Button from '../button/Button';
import Text from '../text/Text';
import Container from './Container';
import Flex from './Container';
import { Method } from '@src/configs/fetch.config';
import useCustomRouter from '@src/hooks/useCustomRouter';
import { everyMonth, everyWeek, everyYear } from '@src/constants/cron';

interface PropsType {
  reportId: number;
}
export default function NotificationTaskButtonContainer({
  reportId,
}: PropsType) {
  const { currentPageRefresh } = useCustomRouter();

  async function handleDeleteReportOption() {
    const url = `/api/notification/reports/${reportId}`;

    try {
      const result = await commonService({
        reqUrl: url,
        method: Method.DELETE,
      });
      alert(result.message);
      currentPageRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteTaskNotification() {}

  function handleCreateTaskNotification(expression: string) {
    console.log(expression);
  }

  return (
    <>
      <Flex elName={'span'} className="flex items-center mt-[0.5rem] ">
        <Container elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            정기 알림 설정
          </Text>
          <Flex elName={'div'} className="flex items-center">
            <Button
              onClick={() => handleCreateTaskNotification(everyWeek)}
              title="매주 월요일 오전 06:00 정기 보고"
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              주 단위
            </Button>
            <Button
              onClick={() => handleCreateTaskNotification(everyMonth)}
              title="매월 첫째주 1일 오전 06:00 정기 보고"
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              월 단위
            </Button>
            <Button
              onClick={() => handleCreateTaskNotification(everyYear)}
              title="매년 1월 1일 오전 06:00 정기 보고"
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              년 단위
            </Button>
          </Flex>
        </Container>
      </Flex>
      <Flex elName={'span'} className="flex items-center mt-[0.5rem] ">
        <Container elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            일회성 알림 설정
          </Text>
          <Flex elName={'div'} className="flex items-center">
            <Button
              title="매주 월요일 오전 06:00 정기 보고"
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              5초 뒤 1회
            </Button>
          </Flex>
        </Container>
      </Flex>
      <Flex elName={'span'} className="flex items-center mt-[0.5rem] ">
        <Container elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            알림/보고서 삭제 <br />
          </Text>
          <Flex elName={'div'} className="flex items-center">
            <Button
              onClick={handleDeleteTaskNotification}
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              알림 삭제{' '}
            </Button>
            <Button
              onClick={handleDeleteReportOption}
              className="border mx-1 hover:bg-slate-200 rounded-md p-1 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              보고서 삭제{' '}
            </Button>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

/** 예약 알림 취소 */
// async function handleStopCron(userId: string = '') {
//     if (userId.length < 2) return alert('사용권한이 없습니다.');

//     const url = '/api/notification/cron';
//     const response = await fetch(url, {
//         method: 'DELETE',
//         body: JSON.stringify({ userId }),
//     });
//     if (response.status === 404) return alert('등록된 알림이 없습니다.');
//     if (!response.ok) throw new Error('알림 취소 실패');
//     const result = await response.json();
//     console.log(result);
// }
