import React from 'react';
import Text from '../ui/text/Text';
import MessageContainer from '../ui/container/Container';
import Heading from '../ui/heading/Heading';
import getIcons from '@src/utils/iconUtils';

interface PropsType {
  title?: string;
  message?: string;
  className?: string;
}

export default function CredentialMessage({
  title = '접근 권한이 없습니다.',
  message = '접근 권한이 없습니다. 로그인 후 다시시도 해보세요.',
  className,
}: PropsType) {
  const { ProhibitIcon } = getIcons();

  return (
    <MessageContainer
      elName={'div'}
      className={`${className} flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg shadow-sm dark:bg-[#151515] dark:border-none`}
    >
      <ProhibitIcon className={'text-6xl mb-4'} />
      <Heading level="2" className="text-xl font-semibold text-red-700 mb-2">
        {title}
      </Heading>
      <Text elementName={'p'} className="text-red-600 mb-4 text-center">
        {message}
      </Text>
    </MessageContainer>
  );
}
