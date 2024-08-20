import { auth } from '@src/auth';

import { signIn } from '@src/auth';

import type { Session, User } from 'next-auth';
import getIcons from '@src/utils/icons';
import Profile from '../Profile';

export async function SignOutIcon() {
  const session = ((await auth()) as Session) || {
    expires: 0,
    user: { email: '', image: '', name: '' },
  };
  const { email, name, image } = session.user as User;
  const { LoginIcon } = getIcons();

  if (!email)
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
  return <Profile image={image} name={name} email={email} />;
}
