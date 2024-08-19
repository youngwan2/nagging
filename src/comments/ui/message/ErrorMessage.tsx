import React from 'react';
import Button from '../button/Button';
import Text from '../text/Text';
import MessageContainer from '../container/Container';
import Heading from '../heading/Heading';

interface PropsType {
  title?: string;
  message?: string;
  className?: string;
  onRetry?: () => void;
}
export default function ErrorMessage({
  title = '네트워크 문제로 데이터를 불러오지 못했습니다.',
  message = '네트워크 문제로 인해 데이터 조회에 실패하였습니다.',
  className,
  onRetry,
}: PropsType) {
  return (
    <MessageContainer
      elName={'div'}
      className={`${className} flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg shadow-sm dark:bg-[#151515] dark:border-none`}
    >
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <Heading level="2" className="text-xl font-semibold text-red-700 mb-2">
        {title}
      </Heading>
      <Text elementName={'p'} className="text-red-600 mb-4 text-center">
        {message}
      </Text>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          다시 시도
        </Button>
      )}
    </MessageContainer>
  );
}
