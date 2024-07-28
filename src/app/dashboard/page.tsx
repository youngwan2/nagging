import { Suspense } from 'react';

import NotificationSection from '@src/comments/ui/section/HomeNotificationSection';
import ProfitSection from '@src/comments/ui/section/ProfitSection';
import CardSkeleton from '@src/comments/ui/skeleton/CardSkeleton';
import Heading from '@src/comments/ui/heading/Heading';

import { auth } from '@src/auth';

export default async function Home() {
  const session = await auth();

  if (!session)
    return (
      <Heading level="2" className="text-[1em]">
        로그인 후 이용이 가능합니다
      </Heading>
    );
  return (
    <>
      <Suspense fallback={<CardSkeleton orientation="horizontal" />}>
        <ProfitSection />
      </Suspense>
      <Suspense fallback={<CardSkeleton orientation="horizontal" />}>
        <NotificationSection />
      </Suspense>
    </>
  );
}
