import Link from 'next/link';
import Image from 'next/image';

import Heading from '../heading/Heading';
import Text from '../text/Text';
import DarkMode from '../../DarkMode';
import MenuIcon from '../icon/MenuIcon';
import FlexBox from '../wrapper/FlexBox';
import { AdsenseButton } from '@src/comments/ui/button/AdsenseButton';

import { auth } from '@src/auth';
import { hasAccountId } from '@src/services/adsense.service';
import { AuthIcon } from '@src/comments/auth/AuthIcon';

export default async function Header() {
  const session = await auth();
  const userId = session?.userId || '';

  const hasAccount = await hasAccountId(userId);

  return (
    <header className="justify-between mx-auto w-full h-[50px] flex items-center border-b-[1px] dark:bg-[#212125] bg-[#fbfbfb] dark:border-gray-700 transition-colors  ">
      <FlexBox className="items-center justify-between max-w-[250px] w-full">
        <Heading level="1" className="dark:text-[white] px-[5px] text-[1.05rem]">
          <Link href="/dashboard" className="w-[100px] flex items-center  p-[3px] mx-4">
            <Image
              width={26}
              height={26}
              className="rounded-full"
              src="/icons/android-launchericon-48-48.png"
              alt="사이트 로고"
            />

            <Text elementName={'p'} className="pl-2">
              잔소리
            </Text>
          </Link>
        </Heading>
        <DarkMode />
      </FlexBox>

      <FlexBox className="items-center justify-center ">
        <MenuIcon />
        {/* <NotificationIcon /> 추가예정 */}
        <AuthIcon />
        {session && !hasAccount ? <AdsenseButton /> : null}
      </FlexBox>
    </header>
  );
}
