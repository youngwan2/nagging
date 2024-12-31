import QuickAccessContainer from '@src/comments/pages/home-page/QuickAccessContainer';
import AlertCardContainer from '@src/comments/pages/home-page/AlertCardContainer';
import Container from '@src/comments/ui/container/Container';
import GuideToast from '@src/comments/ui/toast/GuideToast';

import { Session, User } from 'next-auth';
import { DEFAULT_PROFILE_NAME } from '@src/constants/profile';
import { auth } from '../../../lib/auth';
import { hasAccountId } from '@src/services/adsense.service';

export default async function Home() {
  const session = ((await auth()) as Session) || {
    userId: null,
    expires: 0,
    user: { email: '', name: DEFAULT_PROFILE_NAME },
  };
  const userId = session.userId;
  const { name } = session.user as User;
  const hasUser = await hasAccountId(userId);

  return (
    <>
      <GuideToast hasUser={hasUser} name={name ?? '방문자'} />
      <Container elName={'section'} className="grid 2xl:grid-cols-2 w-full">
        {/* 알림 */}
        <AlertCardContainer />

        {/* 서비스 바로가기 */}
        <QuickAccessContainer />
      </Container>
    </>
  );
}
