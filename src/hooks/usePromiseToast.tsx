// interface PropsType { }

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Promise 토이스트
 * @param fun 호출할 함수
 * @param loading 로딩 메시지
 * @param success 성공 메시지
 * @param error 실패 메시지
 * @returns
 */
export default function usePromiseToast() {
  const [toastState, setToastState] = useState({
    isActive: false,
    func: new Function(),
    loading: '',
    success: '',
    error: '',
  });

  useEffect(() => {
    if (toastState.isActive) {
      toast
        .promise(toastState.func(), {
          loading: toastState.loading,
          success: toastState.success,
          error: toastState.error,
        })
        .then(() => {
          setToastState({ ...toastState, isActive: false });
        });
    }
  }, [toastState.func, toastState.isActive]);

  return { toastState, setToastState };
}
