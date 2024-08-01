import { auth } from '@src/auth';
import NotificationReportOptionForm from '@src/comments/ui/form/NotificationReportOptionForm';
import Container from '@src/comments/ui/container/Container';
import Heading from '@src/comments/ui/heading/Heading';
import NotificationReportOptionList from '@src/comments/ui/list/NotificationReportOptionList';
import Section from '@src/comments/ui/section/Section';
import GraphSkeleton from '@src/comments/ui/skeleton/GraphSkeleton';
import Text from '@src/comments/ui/text/Text';

import { Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';
import { commonService } from '@src/services/common.service';
import { Suspense } from 'react';
import NotificationScheduleList from '@src/comments/ui/list/NotificationScheduleList';

export interface UserReportOptionList {
  reportId: number;
  userId: string;
  task: boolean;
  report: string;
  createdAt: Date;
  updateddAt: Date;
}

const options = {
  reqUrl: urlConfigs.protocol + urlConfigs.host + '/api/adsense/reports/option',
  method: Method.GET,
};

const SectionGroup = Container;
export default async function page() {
  const session = await auth();
  const userId = session?.userId;
  const token = session?.access_token || '';

  const userReportOptionList: UserReportOptionList[] =
    await commonService(options);

  const scheduleListReqOptions = {
    reqUrl:
      urlConfigs.protocol + urlConfigs.host + '/api/notification/schedules',
    method: Method.GET,
    token,
  };

  const userNotificationScheduleList = await commonService(
    scheduleListReqOptions,
  );

  if (!session)
    return (
      <Heading level="2" className="text-[1em] font-medium">
        <Text elementName={'p'}>로그인 후 이용이 가능합니다.</Text>
        <Text elementName={'span'} className="text-gray-800 opacity-55">
          Available after logging in.
        </Text>
      </Heading>
    );
  return (
    <Container
      elName={'div'}
      className="w-full relative flex xl:flex-row flex-col justify-between"
    >
      <SectionGroup elName={'div'} className="w-full">
        {/* 보고서 설정 */}
        <Section>
          <Heading level="2" className="pb-[0.75em]">
            보고서 설정
            <Text
              elementName={'span'}
              className="text-[0.55em] pl-4 text-gray-500 opacity-55"
            >
              Report Settings
            </Text>
          </Heading>
          <NotificationReportOptionForm userId={userId} />
        </Section>

        {/* 알림 예약*/}
        <Section className="mt-16">
          <Heading level="2" className="pb-[0.75em]">
            알림 스케줄 목록
            <Text
              elementName={'span'}
              className="text-[0.55em] pl-4 text-gray-500 opacity-55"
            >
              Notification Schedule List
            </Text>
          </Heading>
          <Text elementName={'p'} className="text-sm text-gray-600 mb-4">
            ※ 원활한 서비스 운영을 위해 중복 등록은 불가능합니다.
          </Text>
          {/* 목록 */}
          <NotificationScheduleList items={userNotificationScheduleList} />
        </Section>
      </SectionGroup>

      {/* 생성한 보고서 옵션 내역 */}
      <Section>
        <Heading
          level="2"
          className="xl:mt-0 xl:ml-5 mt-[4rem] ml-0 pb-[0.75em]"
        >
          보고서 옵션 목록
          <Text
            elementName={'span'}
            className="text-[0.55em] pl-4 text-gray-500 opacity-55"
          >
            Report Option List
          </Text>
        </Heading>
        <Text elementName={'p'} className="opacity-90 text-black text-[0.95em]">
          - 안정적인 서비스 운영을 위해 현재는 보고서 1개에 대해서만 알림설정이
          가능합니다. <br />- 보고서를 삭제해도 알림은 제거되지 않습니다. 삭제
          후 알림을 취소하려면 알림 목록을 이용해주세요.
        </Text>
        <Suspense fallback={<GraphSkeleton />}>
          <NotificationReportOptionList items={userReportOptionList} />
        </Suspense>
      </Section>
    </Container>
  );
}
