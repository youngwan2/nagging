import { auth } from '../../../lib/auth';

import { signIn } from '../../../lib/auth';

import type { Session, User } from 'next-auth';
import getIcons from '@src/utils/iconUtils';
import Profile from '../Profile';
import { DEFAULT_PROFILE_IMG, DEFAULT_PROFILE_NAME } from '@src/constants/profile';

export async function AuthIcon() {
  const session = ((await auth()) as Session) || {
    expires: 0,
    user: { email: '', image: DEFAULT_PROFILE_IMG, name: DEFAULT_PROFILE_NAME },
  };
  const { email, name = DEFAULT_PROFILE_NAME, image = DEFAULT_PROFILE_IMG } = session.user as User;
  const { LoginIcon } = getIcons();

  if (!email) {
    return (
      <form
        className="flex items-center mr-[0.5rem] "
        action={async () => {
          'use server';
          await signIn();
        }}
      >
        <button
          className="hover:text-gray-300 flex justify-center items-center text-center mr-[0.5em] dark:text-white "
          title="로그인 버튼"
          aria-label="로그인"
          type="submit"
        >
          <LoginIcon className="text-[1.75rem]" />
        </button>
      </form>
    );
  } else {
    return <Profile image={image ?? DEFAULT_PROFILE_IMG} name={name ?? DEFAULT_PROFILE_NAME} email={email} />;
  }
}
