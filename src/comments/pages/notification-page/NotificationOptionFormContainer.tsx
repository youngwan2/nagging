import NotificationReportOptionForm from './NotificationReportOptionForm';
import Heading from '../../ui/heading/Heading';
import Text from '../../ui/text/Text';
import Container from '../../ui/container/Container';

interface PropsType {
  userId?: string;
}
export default function NotificationOptionFormContainer({ userId }: PropsType) {
  return (
    <Container elName={'section'} className="w-full">
      <Heading level="2" className="pb-[0.75em]">
        보고서 설정
        <Text elementName={'span'} className="text-[0.55em] pl-4 text-gray-500 opacity-55">
          Report Settings
        </Text>
      </Heading>
      <NotificationReportOptionForm userId={userId} />
    </Container>
  );
}
