import Button from '../button/Button';
import Form from './Form';

import { signIn } from '@src/auth';

interface PropsType {
  text: string;
  buttonClassName: string;
}

export default async function LoginForm({ text, buttonClassName }: PropsType) {
  return (
    <Form
      className="flex items-center mr-[0.5rem] "
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Button
        className={`${buttonClassName} hover:text-gray-300 flex justify-center items-center text-center mr-[0.5em] border-b border-b-black dark:border-b-white dark:text-white`}
        title="로그인 버튼"
        type="submit"
      >
        {text}
      </Button>
    </Form>
  );
}
