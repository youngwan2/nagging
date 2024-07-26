// interface Props { }

import { auth } from '@src/auth';
import Container from '@src/comments/ui/container/Container';
import NotificationForm from '@src/comments/ui/form/NotificationForm';
import Heading from '@src/comments/ui/heading/Heading';
import Section from '@src/comments/ui/section/Section';
import Text from '@src/comments/ui/text/Text';

export default async function page() {
  const session = await auth();

  const token = session?.access_token;
  const userId = session?.userId;

  // if(!token) return <Heading className="text-[1rem]" level="2">로그인 후 이용 가능합니다.</Heading>
  return (
    <Container elName={'div'} className="w-full relative">
      <Section>
        <Heading level="2" className="pb-[0.75em]">
          알림 설정
          <Text
            elementName={'span'}
            className="text-[0.55em] pl-4 text-gray-500"
          >
            Notification Setting
          </Text>
        </Heading>
        {/* 설정 폼 */}
        <NotificationForm token={token} userId={userId}>
          {' '}
        </NotificationForm>
      </Section>

      <Section>
        <Heading level="2" className="mt-[4rem] pb-[0.75em]">
          알림 내역
          <Text
            elementName={'span'}
            className="text-[0.55em] pl-4 text-gray-500"
          >
            Notification List
          </Text>
        </Heading>
      </Section>
    </Container>
  );
}
