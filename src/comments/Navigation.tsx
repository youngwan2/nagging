'use client';

// interface Prop { }
import { IoHomeOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { GoGraph } from 'react-icons/go';
import { useMenuToggle } from '@src/store/menuStore';

export default function Navigation() {
  const isOpen = useMenuToggle((state) => state.isOpen);

  return (
    <nav
      className={`${isOpen ? '' : 'w-[70px]'}  whitespace-nowrap relative max-w-[300px] w-full min-h-[100vh] bg-[#fbfbfb] dark:bg-[#212125] dark:text-white dark:border-r-slate-700 border-r transition-all `}
    >
      <ul className="p-[16px] ">
        <li
          title="홈 이동"
          className="my-4 dark:hover:bg-[#3d3d43] py-[8px] rounded-md hover:bg-[#f4f4f5] hover:font-semibold min-w-[45px]  overflow-hidden "
        >
          <a href="/" className="flex items-center">
            <IoHomeOutline className="min-w-[43px]" />
            <span className="ml-[0.05em] px-[3px]"> 홈</span>
          </a>
        </li>
        <li
          title="알림 설정"
          className="my-4 dark:hover:bg-[#3d3d43] py-[8px] rounded-md hover:bg-[#f4f4f5] hover:font-semibold min-w-[45px] overflow-hidden"
        >
          <a href="/notification-setting" className="flex items-center">
            <CiSettings className="min-w-[43px]" />
            <span className="ml-[0.05em] px-[3px]">알림 설정</span>
          </a>
        </li>
        <li
          title="통계"
          className="my-4 dark:hover:bg-[#3d3d43] py-[8px] rounded-md hover:bg-[#f4f4f5] hover:font-semibold min-w-[45px] overflow-hidden"
        >
          <a href="/anlaytics" className="flex items-center">
            <GoGraph className="min-w-[43px]" />
            <span className="ml-[0.05em] px-[3px]">통계</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
