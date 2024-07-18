import { auth } from '@src/auth';
import AnlayticsContainer from '@src/comments/ui/container/AnlayticsContainer';
import Heading from '@src/comments/ui/heading/Heading';
import ProfitSection from '@src/comments/ui/section/ProfitSection';
import CardSkeleton from '@src/comments/ui/skeleton/CardSkeleton';
import { Suspense } from 'react';
export default async function page() {
  const session = await auth();

  if (!session)
    return (
      <Heading level="2" className="text-[1em]">
        로그인 후 이용이 가능합니다.{' '}
      </Heading>
    );

  const token = session.access_token;
  return (
    <>
      <AnlayticsContainer token={token} />
      <Suspense fallback={<CardSkeleton orientation="horizontal" />}>
        <ProfitSection />
      </Suspense>
    </>
  );
}
