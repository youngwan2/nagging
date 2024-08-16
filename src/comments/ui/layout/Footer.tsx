import Link from 'next/link';

export default function Footer() {
  const getYear = () => new Date().getFullYear();

  return (
    <footer className="mt-auto w-full h-[30vh]  flex items-center border-t-[1px] bg-[#1f1f1f] dark:border-gray-700 transition-colors ">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex flex-col  justify-between items-center">
          {/* 저작 */}
          <div className="text-gray-400 text-sm ">
            {getYear()} nagging. All rights reserved.
          </div>
          {/* 기타 */}
          <div className="flex space-x-6 mt-2">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-gray-600"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-gray-600"
            >
              서비스 이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
