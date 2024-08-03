import NotificationReportOptionForm from '../form/NotificationReportOptionForm';
import Heading from '../heading/Heading';
import Section from '../section/Section';
import Text from '../text/Text';

interface PropsType {
  userId?: string;
}
export default function NotificationOptionFormContainer({ userId }: PropsType) {
  return (
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
  );
}
