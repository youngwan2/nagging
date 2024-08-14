import Link from 'next/link';
import { IoIosHome } from 'react-icons/io';
export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4">
      <div className="max-w-2xl w-full bg-[#fbfbfb] dark:bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <p className="text-xl font-semibold text-gray-600 mt-4">
              이런!.. 현재 페이지를 찾을 수 없습니다
            </p>
            <p className="text-gray-500 mt-2">
              죄송합니다. 요청하신 페이지를 찾을 수 없습니다. 접속 경로를 확인
              후 다시시도 해주세요.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <IoIosHome className="mr-2" size={20} />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
        <div className="bg-gray-50 py-4 px-8 text-center">
          <p className="text-sm text-gray-500">
            도움이 필요하신가요?{' '}
            <a
              target="_blank"
              href="https://forms.gle/rXfxizaqepvy3Shs9"
              className="text-blue-600 hover:underline"
            >
              고객 지원에 문의하세요
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
