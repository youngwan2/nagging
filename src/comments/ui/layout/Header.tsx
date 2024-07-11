import Link from 'next/link';
import Image from 'next/image';
import DarkMode from '../../DarkMode';
import NotificationIcon from '../icon/NotificationIcon';
import MenuIcon from '../icon/MenuIcon';
import { SignOutIcon } from '../../Auth/SignOutIcon';

export default function Header() {
  return (
    <header className="justify-between mx-auto w-full h-[50px] flex items-center border-b-[1px] dark:bg-[#212125] bg-[#fbfbfb] dark:border-gray-700 transition-colors  ">
      <div className="flex items-center justify-between max-w-[250px] w-full">
        <Link href="" className="w-[100px] flex items-center  p-[3px] mx-4">
          <Image
            className="rounded-full"
            width={24}
            height={24}
            src="/icons/android-launchericon-48-48.png"
            alt="사이트 로고"
          />
          <h1 className="dark:text-[white] px-[5px]">잔소리</h1>
        </Link>
        <DarkMode />
      </div>

      <div className="flex items-center justify-center ">
        <MenuIcon />
        <NotificationIcon />
        <SignOutIcon />
      </div>
    </header>
  );
}
