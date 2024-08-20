'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Text from './ui/text/Text';
import Button from './ui/button/Button';
import Container from './ui/container/Container';
import Form from './ui/form/Form';
import FlexBox from './ui/wrapper/FlexBox';

import { logout, withdrawal } from '@src/actions/auth-action';
import toast from 'react-hot-toast';

interface PropsType {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export default function Profile({ image, name, email }: PropsType) {
  const [isToggle, setIsToggle] = useState(false);

  function handleClose() {
    setIsToggle(false);
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClose);
    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, [isToggle]);

  return (
    <>
      <Button className="mr-2" onClick={() => setIsToggle(true)}>
        <Image
          width={40}
          height={40}
          onError={(e) => {
            e.currentTarget.src = '/icons/profile.png';
          }}
          src={image || ''}
          alt="유저 프로필 이미지"
        />
      </Button>

      {/* 모달 */}
      <Container
        aria-label="유저 프로필 모달"
        aria-hidden={isToggle ? 'true' : 'false'}
        elName={'div'}
        className={`${isToggle ? 'flex' : 'hidden'}
                    absolute w-[270px] h-[170px] top-[8%] right-4 flex-col bg-white rounded-sm
                    shadow-[0_0_5px_1px_rgba(0,0,0,0.3)] p-4 z-[1000]
                `}
      >
        <FlexBox className="justify-center pb-3">
          {/* 프로필 이미지 */}
          <Image
            className="w-[45px] h-[45px]"
            width={45}
            height={45}
            onError={(e) => {
              e.currentTarget.src = '/icons/profile.png';
            }}
            src={image || ''}
            alt="유저 프로필 이미지"
          />
          <div>
            {/* 이름/이메일 */}
            <UserInfo email={email} name={name} />
            {/* 애드센스 바로가기 */}
            <Link
              title="애드센스 홈페이지 바로가기 링크"
              className="font-bold text-xs text-white border bg-[#1a73e8] p-2 px-3 m-2 hover:bg-[#1460c3]"
              href={'https://adsense.google.com/intl/ko_kr/start/'}
              target="_blank"
            >
              애드센스 바로가기
            </Link>
          </div>
        </FlexBox>

        {/* 회원 탈퇴 / 로그아웃 */}
        <UserAction />
      </Container>
    </>
  );
}

function UserInfo({ name, email }: Pick<PropsType, 'name' | 'email'>) {
  return (
    <div className="flex-col items-start mb-2">
      <Text elementName={'p'} className="pl-2 dark:text-gray-500">
        {name}
      </Text>
      <Text elementName={'p'} className="pl-2 dark:text-gray-500">
        {email}
      </Text>
    </div>
  );
}

function UserAction() {
  return (
    <div className="flex flex-row justify-between border-t py-3 ">
      <Form className="border hover:bg-gray-100">
        <button
          onClick={async () => {
            const isAction = confirm('회원탈퇴 후 계정 복구는 불가능합니다. 정말로 탈퇴 하시겠습니까?');
            if (isAction) {
              const isComplete = await withdrawal();
              isComplete && toast.success('정상적으로 탈퇴처리 되었습니다.');
            }
          }}
          className="text-[0.95rem] p-1 px-2 text-gray-500"
          title="회원탈퇴"
          type="button"
        >
          회원탈퇴
        </button>
      </Form>
      <Form className="border hover:bg-gray-100" action={logout}>
        <button className="text-[0.95rem] p-1 px-2 text-gray-500" title="로그아웃" type="submit">
          로그아웃
        </button>
      </Form>
    </div>
  );
}
