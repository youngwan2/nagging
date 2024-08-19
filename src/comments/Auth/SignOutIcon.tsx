import { auth } from '@src/auth';
import { revalidatePath } from 'next/cache';

import { signIn, signOut } from '@src/auth';

import type { Session, User } from 'next-auth';
import getIcons from '@src/utils/icons';

export async function SignOutIcon() {
  const session = ((await auth()) as Session) || {
    expires: 0,
    user: { email: '', image: '', name: '' },
  };
  const { email } = session.user as User;

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
  return (
    <form
      className="flex items-center mr-[0.5rem] "
      action={async () => {
        'use server';
        await signOut();
        revalidatePath('/');
      }}
    >
      <button
        className="hover:text-gray-300 flex justify-center items-center text-center mr-[0.5em] border-b border-b-black dark:border-b-white dark:text-white "
        title="로그아웃 버튼"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}
