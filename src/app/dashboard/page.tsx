import { auth } from '@src/auth';
import LoginRequiredMessage from '@src/comments/ui/message/LoginRequireMessage';
import QuickAccessContainer from '@src/comments/ui/container/QuickAccessContainer';
import AlertCardContainer from '@src/comments/ui/container/AlertCardContainer';
import Container from '@src/comments/ui/container/Container';

export default async function Home() {
  const session = await auth();

  if (!session) return <LoginRequiredMessage />;
  return (
    <Container elName={'div'} className="grid 2xl:grid-cols-2 w-full">
      <AlertCardContainer />
      <QuickAccessContainer />
    </Container>
  );
}
