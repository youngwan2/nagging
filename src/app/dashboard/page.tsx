import QuickAccessContainer from '@src/comments/ui/container/QuickAccessContainer';
import AlertCardContainer from '@src/comments/ui/container/AlertCardContainer';
import Container from '@src/comments/ui/container/Container';
import { syncTask } from '@src/task';

export default async function Home() {
  // 동기화
  syncCron();

  return (
    <Container elName={'section'} className="grid 2xl:grid-cols-2 w-full">
      {/* 알림 */}
      <AlertCardContainer />

      {/* 서비스 바로가기 */}
      <QuickAccessContainer />
    </Container>
  );
}

async function syncCron() {
  try {
    const isSync = await syncTask(); // 동기화 처리
    if (isSync) return { message: '동기화 성공' };
    else return { message: '동기화 실패' };
  } catch (error) {
    return { message: '네트워크 에러' };
  }
}
