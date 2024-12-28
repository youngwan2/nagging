'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useResize from '@src/hooks/useResize';

import { IoHomeOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { GoGraph } from 'react-icons/go';
import { RiFileListFill } from 'react-icons/ri';

export default function Navigation() {
  const { isOpen, isMobile } = useResize();

  const navItems = [
    { href: '/dashboard', title: '홈 이동', icon: IoHomeOutline, label: '홈' },
    {
      href: '/dashboard/info',
      title: '정보글',
      icon: RiFileListFill,
      label: '정보',
    },
    {
      href: '/dashboard/notification-settings',
      title: '보고서 알림 설정',
      icon: CiSettings,
      label: '보고서',
    },
    {
      href: '/dashboard/anlaytics',
      title: '간편 통계',
      icon: GoGraph,
      label: '간편 통계',
    },
  ];

  const pathname = usePathname();

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <nav
        className={
          'fixed z-10 bottom-0 left-[50%] translate-x-[-50%] w-full rounded-t-md shadow-[0_-5px_15px_rgba(0,0,0,0.2)]  bg-white dark:bg-black  dark:border-white'
        }
      >
        <ul className="p-[4px] flex justify-center ">
          {navItems.map(({ href, title, icon: Icon, label }) => (
            <li
              key={href}
              title={title}
              className={`${
                pathname === href ? 'dark:bg-[#3d3d43] bg-[#36353d] text-white' : ''
              } my-4 py-[8px] rounded-md hover:font-semibold hover:shadow-[0_0_0_1px_rgba(0,0,0,0.3)] min-w-[45px] overflow-hidden`}
            >
              <Link href={href} className="flex items-center flex-col justify-center mx-3">
                <Icon className="min-w-[43px] w-[75px] mb-2" />
                <span className="ml-[0.05em] px-[3px] text-[0.85rem]">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // 태블릿, 데스크톱
  return (
    <nav
      className={`${
        isOpen ? 'w-full' : 'w-[70px]'
      } whitespace-nowrap relative max-w-[200px] min-h-[100vh] bg-[#fbfbfb] dark:bg-[#212125] dark:text-white dark:border-r-slate-700 border-r transition-all`}
    >
      <ul className="p-[16px]">
        {navItems.map(({ href, title, icon: Icon, label }) => (
          <li
            key={href}
            title={title}
            className={`${pathname === href ? 'dark:bg-[#3d3d43] bg-[#36353d] text-white' : ''} my-4 dark:hover:bg-[#3d3d43] py-[8px] rounded-md hover:font-semibold hover:bg-[#49484f] hover:text-white min-w-[45px] overflow-hidden`}
          >
            <Link href={href} className="flex items-center">
              <Icon className="min-w-[43px]" />
              <span className="ml-[0.05em] px-[3px]">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
