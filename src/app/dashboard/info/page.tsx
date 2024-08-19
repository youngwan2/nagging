import InformationContainer from '@src/comments/ui/container/InformationContainer';
import Heading from '@src/comments/ui/heading/Heading';
import Container from '@src/comments/ui/container/Container';

import { auth } from '@src/auth';

export default async function InformationPage() {
  const session = await auth();
  const token = session?.access_token;

  return (
    <Container elName={'section'} className="w-full">
      <Heading level="2" className="pb-[0.75em]">
        데일리 환율
        <span className="text-[0.55em] pl-4 text-gray-500">Daily Exchange Rates</span>
      </Heading>
      <InformationContainer token={token} />
    </Container>
  );
}
