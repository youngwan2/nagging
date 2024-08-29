import cron from 'node-cron';
import { sendMail } from '@src/nodemailer';
import { connect } from '../prisma/client';
import { tokenRefresh } from './services/google.service';
import {
  ReportOptionType,
  generateCsvReport,
  getAbsenseAccountIdWithUserId,
  getCredentials,
} from './services/adsense.service';

/** 작업 동기화(서버 재시작 시 기존 크론 동기화) */
export async function syncTask() {
  const { prisma, close } = await connect();

  // 예약된 task 가 true 인 경우인 작업만 조회
  try {
    const jobs = await prisma.notificationCron.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        notificationReports: {
          select: {
            report: true,
            task: true,
          },
        },
      },
      where: {
        notificationReports: {
          task: true,
        },
      },
    });

    if (jobs.length < 1) return false;

    // 등록된 모든 작업을 순회하여 동기화
    jobs.forEach(async (job) => {
      // 계정 정보 조회
      const accountInfos = (await prisma.account.findFirst({
        select: {
          refresh_token: true,
        },
        where: {
          userId: job.userId,
        },
      })) as {
        access_token: string;
        expires_at: number;
        refresh_token: string;
      };
      const { refresh_token: refreshToken, access_token: accessToken, expires_at } = accountInfos;
      const currentTimeStamp = Math.floor(Date.now() / 1000);

      // 액세스 토큰 만료 전 작업 동기화 진행
      if (expires_at > currentTimeStamp) {
        const task = createTask(
          job.cronExpression,
          () => sendNotification(job.userId, job.notificationReports.report, accessToken, job.user.email),
          job.userId,
        );
        task.start();
        return true;
        // 액세스 토큰 만료 후 재발급 후 작업 동기화 진행
      } else {
        const newToken = await tokenRefresh(refreshToken);
        if (!newToken) return false;
        const task = createTask(
          job.cronExpression,
          () => sendNotification(job.userId, job.notificationReports.report, newToken, job.user.email),
          job.userId,
        );
        task.start();
        return true;
      }
    });
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await close();
  }
}

/** 작업 등록 */
export function createTask(expression: string, cronFunction: (...rest: any) => void, userId: string) {
  const task = cron.schedule(expression, cronFunction, {
    scheduled: false,
    timezone: 'Asia/Seoul',
    name: userId, // Map 의 키로 지정 됨.
  });

  return task;
}

/** 작업 중지 */
export async function removeTask(userId: string) {
  const cronGroup = cron.getTasks();
  const size = cronGroup.size;
  if (size === 0 || !userId) return false;
  else {
    const hasTask = cronGroup.has(userId);
    const task = cronGroup.get(userId);

    if (hasTask && task) {
      task.stop();
      cronGroup.delete(userId);
      return true;
    }
    return false;
  }
}

/**
 * 사용자 지정 이메일 알림
 * @param userId
 * @param reportOptionJSON
 * @param accessToken 애드센스 크리덴셜 검증 활용
 * @param userEmail
 * @returns
 */
export async function sendNotification(
  userId: string,
  reportOptionJSON: string,
  accessToken: string,
  userEmail: string,
) {
  const reportOption = JSON.parse(reportOptionJSON) as ReportOptionType;
  const accountId = await getAbsenseAccountIdWithUserId(userId); // 유저 account 계정 정보
  const AdsenseCredential = await getCredentials(accessToken); // 자격증명

  if (!accountId || !AdsenseCredential) return false;

  const reportCSV = await generateCsvReport(accountId, AdsenseCredential, reportOption);
  sendMail({
    to: userEmail,
    subject: reportOption.reportName,
    reportName: reportOption.reportName,
    csv: reportCSV,
  });
  console.log(`${userId}님에게 알림을 전송합니다.`);
}

/** DB에 저장된 보고서 옵션 조회  */
export async function getReportOptionFromDb(_reportId: number, userId: string) {
  const { prisma, close } = await connect();

  try {
    const result = (
      await prisma.notificationReports.findMany({
        select: {
          report: true,
        },
        where: {
          userId,
        },
      })
    )[0];

    return result.report;
  } catch {
    return false;
  } finally {
    await close();
  }
}
