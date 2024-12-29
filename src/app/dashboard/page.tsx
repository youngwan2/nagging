import QuickAccessContainer from '@src/comments/pages/home-page/QuickAccessContainer';
import AlertCardContainer from '@src/comments/pages/home-page/AlertCardContainer';
import Container from '@src/comments/ui/container/Container';

export default async function Home() {
  return (
    <Container elName={'section'} className="grid 2xl:grid-cols-2 w-full">
      {/* 알림 */}
      <AlertCardContainer />

      {/* 서비스 바로가기 */}
      <QuickAccessContainer />
    </Container>
  );
}
