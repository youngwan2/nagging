// interface Props { }

import Card from '../card/Card';
import Container from '../container/Container';
import Heading from '../heading/Heading';
import Section from './Section';

export default function NotificationSection() {
  return (
    <Section>
      <Heading level="2" className="py-[0.75em]">
        알림 설정
        <span className="text-[0.55em] pl-4 text-gray-500">
          Notification Settings
        </span>
      </Heading>
      <Container
        elName={'div'}
        className="grid sm:grid-cols-1  2xl:grid-cols-2"
      >
        <Card koTitle="eamil" enTitle="Email">
          <p className="pt-[2em]">
            설정한 날짜와 시간에 맞춰 이메일로 수익 정보를 전송합니다.
          </p>
        </Card>
        <Card koTitle="소셜 네트워크" enTitle="SNS">
          <p className="pt-[2em]">
            이메일이 아닌 SNS 계정으로 수익 정보를 전달합니다.
          </p>
        </Card>
      </Container>
    </Section>
  );
}