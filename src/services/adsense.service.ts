import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../prisma/client';
import { ReportOptionType, ReportRequest } from '@src/types/adsense.types';

/** 애드센스 계정에 대한 알림을 표시 */
export async function getAdsenseAlert(userId: string, token: string) {
  try {
    const accountId = ((await getAdsenseAccountFromDb(userId)) as string) || '';

    if (!accountId) return false;

    const oauth = await getCredentials(token);

    if (!oauth) return [];
    const alerts = google.adsense({ auth: oauth, version: 'v2' }).accounts.alerts.list({
      parent: accountId,
    });
    return (await alerts).data.alerts;
  } catch (error) {
    console.error(error);
  }
}

/** 데이터베이스에 저장된 애드센스 계정 정보 조회 */
async function getAdsenseAccountFromDb(userId: string) {
  try {
    const { accountId } = (await prisma.adsenseAccount.findFirst({
      select: {
        accountId: true,
      },
      where: {
        userId,
      },
    })) || { accountId: null };
    return accountId;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/** 데이터베이스에 저장된 애드센스 계정 정보 조회 */
export async function hasAccountId(userId?: string | null) {
  if (!userId) return false;

  try {
    const { accountId } = (await prisma.adsenseAccount.count({
      select: {
        accountId: true,
      },
      where: {
        userId,
      },
    })) || { accountId: 0 };
    if (accountId > 0) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * 애드센스 자격증명
 * @param accessToken
 * @returns auth
 */
export async function getCredentials(accessToken: string) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return auth;
  } catch (error) {
    console.error('자격증명 실패:', error);
    return false;
  }
}

/**
 * 애드센스 유저 정보 조회
 * @param auth
 * @returns
 */
export async function getAccountInfo(auth: OAuth2Client) {
  try {
    const adsense = google.adsense({ version: 'v2', auth });
    const response = await adsense.accounts.list();

    if (response.data.accounts && response.data.accounts.length > 0) {
      const accounts = response.data.accounts[0];
      return accounts.name;
    } else {
      throw new Error('구글 애드센스 계정 못 찾음.');
    }
  } catch (error) {
    console.error('유저 정보 조회 실패:', error);
    throw new Error('유저 정보 조회에 실패했습니다.');
  }
}

/**
 * 지급액 및 미지급 액
 * @param accountName getAccountInfo 로 부터 반환받은 accountName
 * @param auth AccessToken 자격증명
 * @returns payments
 */
export async function getPayments(accountName: string | null | undefined, auth: OAuth2Client) {
  try {
    const adsense = google.adsense({ version: 'v2', auth });
    const response = adsense.accounts.payments;
    const result = await response.list({ parent: accountName || '' });
    return result.data.payments;
  } catch (error) {
    console.error('지급액 조회 실패:', error);
    throw new Error('지급액 조회에 실패했습니다.');
  }
}

/**
 * 보고서 생성
 * @param accountName getAccountInfo 로 부터 반환받은 accountName
 * @param auth AccessToken 자격증명
 * @param dateRange 보고서 요청 정보
 * @returns 보고서 데이터
 */
export async function generateReport(
  accountName: string | null | undefined,
  auth: OAuth2Client,
  dateRange: ReportRequest,
) {
  try {
    const adsense = google.adsense({ version: 'v2', auth });
    const response = adsense.accounts.reports.generate({
      account: accountName?.toString(),
      dateRange: 'CUSTOM',
      dimensions: ['MONTH'],
      'endDate.day': dateRange.endDate.day,
      'endDate.month': dateRange.endDate.month,
      'endDate.year': dateRange.endDate.year,
      metrics: ['ESTIMATED_EARNINGS'],
      reportingTimeZone: 'ACCOUNT_TIME_ZONE',
      'startDate.day': dateRange.startDate.day,
      'startDate.month': dateRange.startDate.month,
      'startDate.year': dateRange.startDate.year,
    });

    const { rows, totals, totalMatchedRows } = (await response).data;
    const result = { rows, totals, totalMatchedRows };

    return result;
  } catch (error) {
    console.error('보고서 생성 실패:', error);
    throw new Error('보고서 생성에 실패했습니다.');
  }
}

/**
 * 보고서 CSV 생성
 */
export async function generateCsvReport(
  accountName: string | null | undefined,
  auth: OAuth2Client,
  dateRange: ReportOptionType,
) {
  try {
    const adsense = google.adsense({ version: 'v2', auth });
    const response = adsense.accounts.reports.generateCsv({
      account: accountName?.toString(),
      dateRange: 'CUSTOM',
      dimensions: dateRange.dimensions,
      'endDate.day': dateRange.endDate.day,
      'endDate.month': dateRange.endDate.month,
      'endDate.year': dateRange.endDate.year,
      metrics: dateRange.metrics,
      reportingTimeZone: 'ACCOUNT_TIME_ZONE',
      'startDate.day': dateRange.startDate.day,
      'startDate.month': dateRange.startDate.month,
      'startDate.year': dateRange.startDate.year,
    });

    const data = (await response).data;
    return data;
  } catch (error) {
    console.error('보고서 CSV 포맷 생성 실패:', error);
    throw new Error('보고서 생성에 실패했습니다.');
  }
}

/**
 * 애드센스 계정 저장
 * @param accountName
 * @param userId
 * @returns
 */
export async function saveAccountName(accountName: string | null | undefined, userId: string, prisma: PrismaClient) {
  if (typeof accountName !== 'string') return;
  try {
    return await prisma.adsenseAccount.create({
      data: {
        userId,
        accountId: accountName,
      },
    });
  } catch (error) {
    console.error('/services/adsense.service.ts', error);
    throw new Error('애드센스 계정 아이디 저장 실패');
  }
}

/** DB에 저장된 유저의 애드센스 계정 아이디 조회 */
export async function getAbsenseAccountIdWithUserId(userId: string) {
  try {
    return (
      await prisma.adsenseAccount.findMany({
        select: {
          accountId: true,
        },
        where: {
          userId,
        },
      })
    )[0].accountId;
  } catch (error) {
    console.error('/services/adsense.service.ts', error);
    return false;
  }
}
