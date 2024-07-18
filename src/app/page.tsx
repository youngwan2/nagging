import { auth } from '@src/auth';
import Container from '@src/comments/ui/container/Container';
import Heading from '@src/comments/ui/heading/Heading';
import SplitText from '@src/comments/ui/text/SplitText';
import Text from '@src/comments/ui/text/Text';
import type { Session, User } from 'next-auth';
export default async function page() {
  const session = ((await auth()) as Session) || {
    expires: 0,
    user: { email: '', image: '', name: '' },
  };

  const { email } = session.user as User;
  if (!session) return null;

  return (
    <Container elName={'section'} className="max-w-[768px] w-full">
      <Heading level="2" className="font-light">
        <SplitText
          text={`잔소리에 오신 것을 환영합니다. ${email?.split('@')[0]}님!`}
        ></SplitText>
      </Heading>
      <Text elementName={'p'} className="mt-5">
        잔소리는 이용자님의 애드센스 수익을 한화로 변환하여 원하는 시기에
        취합하여 알림을 받을 수 있는 서비스입니다. 평소 귀찮게 일일이 계산해야
        했던 원화 계산을 쉽고 간편하게 처리하고, 언제든지 빠르게 세금 신고할 수
        있는 환경을 만들어보세요.
      </Text>
    </Container>
  );
}
