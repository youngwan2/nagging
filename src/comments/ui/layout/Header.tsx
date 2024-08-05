import Link from 'next/link';
import Image from 'next/image';
import DarkMode from '../../DarkMode';
import NotificationIcon from '../icon/NotificationIcon';
import MenuIcon from '../icon/MenuIcon';
import { SignOutIcon } from '../../auth/SignOutIcon';
import { AdsenseButton } from '@src/comments/ui/button/AdsenseButton';
import Heading from '../heading/Heading';
import Container from '../container/Container';
import Text from '../text/Text';
import { auth } from '@src/auth';

const FlexBox = Container;
export default async function Header() {
  const session = await auth();

  return (
    <header className="justify-between mx-auto w-full h-[50px] flex items-center border-b-[1px] dark:bg-[#212125] bg-[#fbfbfb] dark:border-gray-700 transition-colors  ">
      <FlexBox
        elName={'div'}
        className="flex items-center justify-between max-w-[250px] w-full"
      >
        <Heading
          level="1"
          className="dark:text-[white] px-[5px] text-[1.05rem]"
        >
          <Link
            href="/dashboard"
            className="w-[100px] flex items-center  p-[3px] mx-4"
          >
            <Image
              width={24}
              height={24}
              src="/icons/android-launchericon-48-48.png"
              alt="사이트 로고"
            />

            <Text elementName={'p'} className="pl-2">
              Nagging
            </Text>
          </Link>
        </Heading>
        <DarkMode />
      </FlexBox>

      <FlexBox elName={'div'} className="flex items-center justify-center ">
        <MenuIcon />
        <NotificationIcon />
        <SignOutIcon />
        {session ? <AdsenseButton /> : null}
      </FlexBox>
    </header>
  );
}
