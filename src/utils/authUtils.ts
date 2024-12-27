import { auth } from '../../lib/auth';
import { Session } from 'next-auth';

export async function getUserData() {
  const { userId, user, access_token } = ((await auth()) as Session) || { userId: '', accessToken: '' };
  console.log(userId, user, access_token);
  if (!userId || !user) {
    throw new Error('접근 권한이 없습니다.');
  }
  return { userId, user, access_token };
}
