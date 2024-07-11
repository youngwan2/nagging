import { auth } from '@src/auth';
import type { Session, User } from 'next-auth';
export default async function page() {
  const session = ((await auth()) as Session) || {
    expires: 0,
    user: { email: '', image: '', name: '' },
  };

  const { email } = session.user as User;
  if (!session) return null;

  return (
    <div>
      <h2>잔소리에 오신 것을 환영합니다. {email}님!</h2>
      <p></p>
    </div>
  );
}
