import { auth } from '@src/auth';
import { revalidatePath } from 'next/cache';
import { urlConfigs } from '@src/configs/url.config';
import Button from './Button';
import Form from '../form/Form';

export async function AdsenseButton() {
  const session = await auth();
  const userId = session?.userId;
  const token = session?.access_token || '';

  const adsenseDataFetch = async (userId: string | null | undefined) => {
    'use server';
    const url = urlConfigs.protocol + urlConfigs.host + '/api/adsense';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ userId }),
      });
      revalidatePath('/');
    } catch (error) {
      console.error('애드센스 계정 불러오기 실패:', error);
    }
  };

  if (!session) return null;

  const getAdsenseAccountWithUserid = adsenseDataFetch.bind(null, userId);
  return (
    <Form
      className="flex items-center mr-[0.5rem] "
      action={getAdsenseAccountWithUserid}
    >
      <Button
        className={
          'hover:text-gray-300 flex justify-center items-center text-center mr-[0.5em] border-b border-b-black dark:border-b-white dark:text-white '
        }
        title="애드센스 계정 정보를 불러옵니다. 보안을 위해 요청 시에만 모든 서비스 이용이 가능합니다."
        type="submit"
      >
        AdSense
      </Button>
    </Form>
  );
}
