// interface Props { }

import { auth } from '@src/auth';
import NotificationReportOptionForm from '@src/comments/pages/notification-setting/NotificationReportOptionForm';
import Container from '@src/comments/ui/container/Container';
import Flex from '@src/comments/ui/container/Container';
import NotificationForm from '@src/comments/ui/form/NotificationForm';
import Heading from '@src/comments/ui/heading/Heading';
import NotificationList from '@src/comments/ui/list/NotificationList';
import Section from '@src/comments/ui/section/Section';
import Text from '@src/comments/ui/text/Text';
import { Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';
import { commonService } from '@src/services/common.service';

export interface UserReportOptionList {
  reportId: number;
  userId: string;
  report: string;
  createdAt: Date;
  updateddAt: Date;
}

const options = {
  reqUrl: urlConfigs.protocol + urlConfigs.host + '/api/adsense/reports/option',
  method: Method.GET,
};
export default async function page() {
  const session = await auth();

  const token = session?.access_token;
  const userId = session?.userId;

  const userReportOptionList: UserReportOptionList[] =
    await commonService(options);

  // if(!token) return <Heading className="text-[1rem]" level="2">로그인 후 이용 가능합니다.</Heading>
  return (
    <Container
      elName={'div'}
      className="w-full relative flex xl:flex-row flex-col justify-between"
    >
      <Flex elName={'div'} className="w-full">
        {/* 보고서 설정 */}
        <Section>
          <Heading level="2" className="pb-[0.75em]">
            보고서 설정
            <Text
              elementName={'span'}
              className="text-[0.55em] pl-4 text-gray-500 opacity-55"
            >
              Report Setting
            </Text>
          </Heading>
          <NotificationReportOptionForm userId={userId} />
        </Section>

        {/* 알림 설정 */}
        <Section className="mt-16">
          <Heading level="2" className="pb-[0.75em]">
            알림 설정
            <Text
              elementName={'span'}
              className="text-[0.55em] pl-4 text-gray-500 opacity-55"
            >
              Notification Setting
            </Text>
          </Heading>
          <Text elementName={'p'}>
            ※ 원활한 서비스 운영을 위해 중복 등록은 불가능합니다.
          </Text>
          {/* 설정 폼 */}
          <NotificationForm
            className="mt-[1rem]"
            token={token}
            userId={userId}
          />
        </Section>
      </Flex>

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
        <NotificationList items={userReportOptionList} />
      </Section>
    </Container>
  );
}
