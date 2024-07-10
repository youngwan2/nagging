import { signOut } from '@src/auth';

export function SignOutIcon() {
  return (
    <form
      className="flex items-center mr-[0.5rem] "
      action={async () => {
        'use server';
        await signOut();
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
