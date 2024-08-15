'use server';

import { auth } from '@src/auth';
import {
  getAccountInfo,
  getCredentials,
  saveAccountName,
} from '@src/services/adsense.service';
import { connect } from '../../prisma/client';

export const adsenseDataFetch = async () => {
  try {
    const { prisma } = await connect();
    const session = await auth();
    const userId = session?.userId;
    const accessToken = session?.access_token;

    if (!userId || !accessToken) {
      return { hasId: false };
    }

    // 저장된 애드센스 계정이 있는지 확인하고, 있으면 불러옵니다.
    const dbAccountName = await prisma.adsenseAccount.findMany({
      select: { accountId: true },
      where: { userId },
    });

    if (dbAccountName.length > 0) return { hasId: true };

    // 구글 로그인으로 받은 accessToken을 사용해서 애드센스 자격증명을 확인합니다.
    const oauth = await getCredentials(accessToken);

    if (!oauth) throw new Error('인증된 유저가 아님');

    // 기존 계정이 있으면 불러오고, 없으면 새로 요청해서 불러옵니다.
    const accountName =
      (dbAccountName.length > 0
        ? dbAccountName[0].accountId
        : await getAccountInfo(oauth)
      )?.toString() ?? '';

    // 새로 불러온 계정의 경우 데이터베이스에 저장합니다.
    if (dbAccountName.length < 1) {
      await saveAccountName(accountName, userId, prisma);
      return { hasId: true };
    }
  } catch (error) {
    console.error('요청 불가', error);
  }
};
