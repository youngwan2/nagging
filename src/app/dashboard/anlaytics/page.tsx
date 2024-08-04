import { auth } from '@src/auth';
import ProfitSection from '@src/comments/section/ProfitSection';
import AnlayticsContainer from '@src/comments/ui/container/AnlayticsContainer';
import Heading from '@src/comments/ui/heading/Heading';
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
      {/* 예상 수익 통계 */}
      <AnlayticsContainer token={token} />
      {/* 최근 지급 통계 */}
      <Suspense fallback={<CardSkeleton orientation="horizontal" />}>
        <ProfitSection />
      </Suspense>
    </>
  );
}
