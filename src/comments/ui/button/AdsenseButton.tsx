'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';

import Button from './Button';
import Form from '../form/Form';
import { adsenseDataFetch } from '@src/actions/adsense-actions';

import toast from 'react-hot-toast';

export function AdsenseButton() {
  const initialState = {
    hasId: false,
  };

  const [state, formAction, pending] = useFormState(adsenseDataFetch, initialState);

  useEffect(() => {
    if (state?.hasId === true) {
      toast('성공적으로 애드센스 계정ID 를 조회하였습니다.');
    }

    if (state?.hasId === null) {
      toast.error('구글 애드센스 계정ID가 존재하지 않습니다. 애드센스 계정 등록 후 다시시도해 주세요.');
    }
  }, [state]);

  if (state?.hasId) return null;

  return (
    <Form className="flex items-center mr-[0.5rem] " action={formAction}>
      <Button
        disabled={pending}
        className={
          'hover:text-gray-300 flex justify-center items-center text-center mr-[0.5em] border-b border-b-black dark:border-b-white dark:text-white '
        }
        title="애드센스 계정 정보를 불러옵니다. 보안을 위해 요청 시에만 모든 서비스 이용이 가능합니다."
        type="submit"
      >
        {pending ? '조회중' : 'AD 조회'}
      </Button>
    </Form>
  );
}
