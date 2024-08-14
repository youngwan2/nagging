'use client'; // Error components must be Client Components
import { useEffect } from 'react';

import Button from '@src/comments/ui/button/Button';
import Container from '@src/comments/ui/container/Container';
import Heading from '@src/comments/ui/heading/Heading';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      elName={'section'}
      className="w-full flex flex-col justify-center items-center px-4 transition-colors duration-300"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 text-center transform transition-all duration-300 hover:scale-105">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-red-500 dark:bg-red-600 rounded-full opacity-10 animate-ping"></div>
          <svg
            className="relative z-10 mx-auto text-red-500 dark:text-red-400 w-20 h-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <Heading
          level="2"
          className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4"
        >
          앗! 문제가 발생했어요!
        </Heading>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{error.message}</p>
        <Button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
          다시시도
        </Button>
      </div>
    </Container>
  );
}
