import { auth } from '@src/auth';
import ProfitSection from '@src/comments/section/ProfitSection';
import AnlayticsContainer from '@src/comments/ui/container/AnlayticsContainer';
import LoginRequiredMessage from '@src/comments/ui/message/LoginRequireMessage';
export default async function page() {
  const session = await auth();

  if (!session) return <LoginRequiredMessage />;

  const token = session.access_token;
  return (
    <>
      {/* 예상 수익 통계 */}
      <AnlayticsContainer token={token} />
      {/* 최근 지급 통계 */}
      <ProfitSection />
    </>
  );
}
