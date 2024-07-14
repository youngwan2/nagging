'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useResize from '@src/hooks/useResize';

import { IoHomeOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { GoGraph } from 'react-icons/go';
import { RiFileListFill } from 'react-icons/ri';

export default function Navigation() {
  const { isOpen } = useResize();

  const navItems = [
    { href: '/dashboard', title: '홈 이동', icon: IoHomeOutline, label: '홈' },
    {
      href: '/dashboard/info',
      title: '정보글',
      icon: RiFileListFill,
      label: '정보',
    },
    {
      href: '/dashboard/notification-setting',
      title: '알림 설정',
      icon: CiSettings,
      label: '알림 설정',
    },
    {
      href: '/dashboard/anlaytics',
      title: '통계',
      icon: GoGraph,
      label: '통계',
    },
  ];

  const pathname = usePathname();

  return (
    <nav
      className={`${isOpen ? 'w-full' : 'w-[70px]'} whitespace-nowrap relative max-w-[300px] min-h-[100vh] bg-[#fbfbfb] dark:bg-[#212125] dark:text-white dark:border-r-slate-700 border-r transition-all`}
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
