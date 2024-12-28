import React from 'react';
import Form from '../ui/form/Form';
import { signIn } from '../../../lib/auth';
import Heading from '../ui/heading/Heading';
import Text from '../ui/text/Text';
import Button from '../ui/button/Button';

export default function LoginRequiredMessage() {
  return (
    <Form
      action={async () => {
        'use server';
        await signIn();
      }}
      className="flex flex-col items-center justify-center min-h-[200px] dark:bg-[#212125] bg-gray-100 rounded-lg shadow-md p-8 transition animate-appearance-in "
    >
      <LockIcon />
      <Heading level="2" className="text-xl font-semibold text-gray-800 mb-2">
        로그인이 필요합니다
      </Heading>
      <Text elementName={'p'} className="text-gray-600 mb-6 text-center">
        이 기능을 이용하려면 로그인이 필요합니다.
      </Text>
      <Button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        로그인하기
      </Button>
    </Form>
  );
}

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 text-gray-500 mb-4"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
