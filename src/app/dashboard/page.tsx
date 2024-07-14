import NotificationSection from '@src/comments/ui/section/NotificationSection';
import ProfitSection from '@src/comments/ui/section/ProfitSection';
import CardSkeleton from '@src/comments/ui/skeleton/CardSkeleton';
import { Suspense } from 'react';

export default function Home() {
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
