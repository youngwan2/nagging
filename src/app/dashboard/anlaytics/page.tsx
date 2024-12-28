import { auth } from '../../../../lib/auth';
import ProfitSection from '@src/comments/ui/section/ProfitSection';
import AnalyticsContainer from '@src/comments/pages/analytics-page/AnalyticsContainer';
export default async function page() {
  const session = await auth();

  const token = session?.access_token;
  return (
    <>
      {/* 예상 수익 통계 */}
      <AnalyticsContainer token={token} />
      {/* 최근 지급 통계 */}
      <ProfitSection />
    </>
  );
}
