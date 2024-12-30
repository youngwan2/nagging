'use client';
import { useAdsenseAuthState } from '@src/store/adsenseAuthStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function GuideToast({ hasUser, name }: { hasUser: boolean; name: string }) {
  const { setHasUserAdsenseId } = useAdsenseAuthState();
  useEffect(() => {
    setHasUserAdsenseId(hasUser);
  }, [hasUser]);

  const showToast = () => {
    if (hasUser) return;
    toast.custom(
      (t: { visible: any; id: string | undefined }) => (
        <div
          className={`
              p-4
              flex items-center max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto
              ${t.visible ? 'animate-enter' : 'animate-leave'}
            `}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M8 20l-2-2m12 0l2-2m-6 2V4"
              />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-900">새로운 알림</p>
            <p className="mt-1 text-sm text-gray-500">
              {name === '방문자' || name === '익명'
                ? name +
                  '님! 환영합니다. 정상 서비스 이용을 위해서는 로그인 후 사용자 아이콘 우측의 [AD 조회]가 필요합니다.'
                : name +
                  '님! 환영합니다. 정상 서비스 이용을 위해서는 사용자 아이콘 우측의 [AD 조회]를 통해 애드센스 계정ID 조회가 필요합니다. 계정이 없으시면 사용자 아이콘 클릭 후 애드센스 사이트를 방문하여, 회원가입을 진행해주세요.'}
            </p>
          </div>
          <button
            className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => toast.remove()}
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 9.293l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 4000 },
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showToast();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return <></>;
}
