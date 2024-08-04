import Link from 'next/link';
import Card from '../card/SummaryCard';
import Container from '../container/Container';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import Section from './Section';

export default function NotificationSection() {
  return (
    <Section>
      <Heading level="2" className="py-[0.75em]">
        알림/보고서 설정
        <span className="text-[0.55em] pl-4 text-gray-500">
          Notification/Report Settings
        </span>
      </Heading>
      <Container elName={'div'} className="grid sm:grid-cols-1 2xl:grid-cols-2">
        <Card koTitle="설정 바로가기" enTitle="Go to settings">
          <Link href={'/dashboard/notification-settings'}>
            <Text elementName={'span'} className="pt-[2em]">
              설정한 보고서 옵션을 기반으로 지정한 날짜에 맞춰 이메일로 수익
              정보를 전송합니다.
            </Text>
          </Link>
        </Card>
      </Container>
    </Section>
  );
}
