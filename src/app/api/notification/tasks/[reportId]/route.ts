import cron from 'node-cron';
import { NextRequest, NextResponse } from 'next/server';

import { createTask, getReportOptionFromDb, removeTask, sendNotification } from '@src/task';
import { prisma } from '../../../../../../prisma/client';
import { getUserData } from '@src/utils/authUtils';
import { validateCronExpression } from '@src/utils/cronUtils';

const cronGroup = cron.getTasks();

// params reference:
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
export async function POST(req: NextRequest, { params }: { params: Promise<{ reportId: string }> }) {
  const reportId = Number((await params).reportId);
  const json = await req.json();
  const cronExpression = json?.cron || null;

  try {
    const { userId, access_token: accessToken, user } = await getUserData();
    await validateCronExpression(cronExpression);

    const reportOptionJSON = await getReportOption(reportId, userId);

    if (!accessToken) return NextResponse.json({ message: '접근 권한이 없습니다.' }, { status: 403 });
    if (!reportOptionJSON) {
      return NextResponse.json({ message: '등록된 보고서 옵션이 아닙니다.' }, { status: 404 });
    }

    const userCronInfo = await prisma.notificationCron.findMany({
      where: { userId },
    });

    const isRegistered = userCronInfo.length > 0;

    const task = createTask(
      cronExpression,
      () => sendNotification(userId, reportOptionJSON, accessToken, user.email),
      userId,
    );

    // 이미 등록되어 있는 작업 이라면, 새로운 작업으로 변경
    if (isRegistered) {
      await updateCron(cronExpression, userId, reportId, task);
      return NextResponse.json({ message: '선택한 옵션으로 알림이 재설정 되었습니다.' }, { status: 201 });
      // 등록된 작업 없으면, 작업 추가
    } else {
      await createCron(cronExpression, userId, reportId, task);
      return NextResponse.json({ message: '보고서 알림 등록 성공.' }, { status: 201 });
    }
  } catch (error) {
    console.error('작업등록 실패:', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ reportId: string }> }) {
  const reportId = Number((await params).reportId);
  if (cronGroup.size === 0) {
    return NextResponse.json({ message: '예약된 알림이 존재하지 않습니다.' });
  }

  try {
    const { userId } = await getUserData();

    const userCronInfo = await prisma.notificationCron.findMany({
      where: { userId },
    });

    const hasTask = cronGroup.has(userId);
    const isStoredTask = userCronInfo.length > 0;

    const activeTask = (
      await prisma.notificationReports.findMany({
        select: { task: true },
        where: { reportId },
      })
    )[0].task;

    if (activeTask === false) {
      return NextResponse.json({ message: '해당 보고서의 예약 알림은 존재하지 않습니다.' });
    }

    if (isStoredTask && hasTask) {
      removeTask(userId);

      await prisma.notificationReports.updateMany({
        data: { task: false },
        where: { reportId },
      });

      await prisma.notificationCron.delete({
        where: { userId },
      });

      return NextResponse.json({ message: '알림 취소 완료' });
    }

    if (!isStoredTask && !hasTask) {
      return NextResponse.json({ message: '처리할 작업이 없음' }, { status: 404 });
    }

    return NextResponse.json({ message: '알림 취소 완료' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  }
}

/** 유틸 함수*/

async function getReportOption(reportId: number, userId: string) {
  const reportOptionJSON = await getReportOptionFromDb(reportId, userId);
  if (!reportOptionJSON) {
    throw new Error('등록된 보고서 옵션이 아닙니다.');
  }
  return reportOptionJSON;
}

async function updateCron(cronExpression: string, userId: string, reportId: number, task: any) {
  await removeTask(userId);
  await prisma.notificationCron.update({
    data: { cronExpression, reportId },
    where: { userId },
  });

  await prisma.notificationReports.update({
    data: { task: true },
    where: { reportId },
  });

  await prisma.notificationReports.updateMany({
    data: { task: false },
    where: { userId, NOT: { reportId } },
  });

  task.start();
}

/**
 * 크론생성
 * @param cronExpression
 * @param userId
 * @param reportId
 * @param task
 */
async function createCron(cronExpression: string, userId: string, reportId: number, task: any) {
  await prisma.notificationCron.create({
    data: { task: '', cronExpression, userId, reportId },
  });

  await prisma.notificationReports.update({
    data: { task: true },
    where: { reportId },
  });

  task.start();
}
