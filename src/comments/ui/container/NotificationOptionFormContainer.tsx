import NotificationReportOptionForm from '../form/NotificationReportOptionForm';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import Container from './Container';

interface PropsType {
  userId?: string;
}
export default function NotificationOptionFormContainer({ userId }: PropsType) {
  return (
    <Container elName={'section'}>
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
    </Container>
  );
}
