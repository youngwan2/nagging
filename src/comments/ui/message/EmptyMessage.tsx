import React from 'react';
import Text from '../text/Text';
import MessageContainer from '../container/Container';
import Heading from '../heading/Heading';

interface PropsType {
  title?: string;
  message?: string;
  className?: string;
}

export default function EmptyMessage({
  title = '조회된 데이터가 없습니다.',
  message = '조회된 데이터를 찾을 수 없습니다.',
  className,
}: PropsType) {
  return (
    <MessageContainer
      elName={'div'}
      className={`${className} flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-sm dark:bg-[#151515] dark:border-none`}
    >
      <svg
        className="w-16 h-16 text-gray-500 mb-4"
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
      <Heading level="2" className="text-xl font-semibold text-gray-700 mb-2">
        {title}
      </Heading>
      <Text elementName={'p'} className="text-gray-600 mb-4 text-center">
        {message}
      </Text>
    </MessageContainer>
  );
}
