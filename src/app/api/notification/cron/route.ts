import cron from 'node-cron';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

const cronGroup = new Map();
const users = new Set();

/** GET | 기존에 등록된 크론 조회 및 Map 저장 */
export async function GET() {
  const allCron = await prisma.notificationCron.findMany({});
  allCron.forEach((userCronInfo) => {
    users.add(userCronInfo.userId);
  });

  return NextResponse.json({}, { status: 203 });
}

/**POST | 사용자 예약 알림 크론 추가 처리 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const userId = json.userId as string;
    const cronExpression = json.cron || { cron: null };

    if (!userId)
      return NextResponse.json(
        { error: '접근 권한이 없습니다.' },
        { status: 401 },
      );
    if (!cron.validate(cronExpression))
      return NextResponse.json({ error: '크론이 아닙니다.' }, { status: 400 });

    // 유저 아이디를 사용하여 예약된 크론이 존재하는지 데이터베이스에서 확인
    const userCronInfo = (
      await prisma.notificationCron.findMany({
        where: { userId },
      })
    )[0];

    const isRegistered = userCronInfo ? userCronInfo.userId === userId : false; // 데이터베이스 등록 유무

    // 데이터베이스에 존재한다면, 기존 크론을 취소하고, 새로운 요청으로 재등록 한다.
    if (isRegistered) {
      removeCron(userId, cronGroup);
      addCron(
        cronExpression,
        userId,
        () => sendNotification(userId),
        cronGroup,
      );

      await prisma.notificationCron.update({
        data: {
          cronExpression: cronExpression,
        },
        where: { userId },
      });
      return NextResponse.json(
        { message: '재설정 되었습니다.' },
        { status: 201 },
      );

      // 등록된 크론이 존재하지 않는다면 작업을 생성한다.
    } else {
      addCron(
        cronExpression,
        userId,
        () => sendNotification(userId),
        cronGroup,
      );
      await prisma.notificationCron.create({
        data: { cronExpression, userId },
      });
      return NextResponse.json({ message: '크론 등록 성공.' }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
}

// /** DELETE | 사용자 예약 알림 크론 삭제 처리 */
export async function DELETE(req: NextRequest) {
  const json = await req.json();
  const userId = json.userId;
  try {
    if (!userId)
      return NextResponse.json(
        { error: '접근 권한이 없습니다.' },
        { status: 401 },
      );

    const userCronInfo =
      (await prisma.notificationCron.findMany({
        where: { userId },
      })) || [];
    const hasTask = cronGroup.has(userId);
    const isStoredTask = userCronInfo.length > 0;

    // DB와 MAP 모두 크론이 존재하는 경우
    if (isStoredTask && hasTask) {
      removeCron(userId, cronGroup);
      return NextResponse.json({ message: '작업 취소' }, { status: 204 });
    }

    // 데이터베이스에만 크론이 존재하는 경우
    if (isStoredTask) {
      await prisma.notificationCron.delete({
        where: { userId },
      });
    }

    // Map 객체에만 크론이 존재하는 경우
    if (hasTask) {
      cronGroup.delete(userId);
    }

    removeCron(userId, cronGroup);

    // 아에 존재하지 않는 경우
    if (!isStoredTask && !hasTask) {
      return NextResponse.json(
        { message: '처리할 작업이 없음' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: '작업 취소' }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: '네트워크 에러' },
      { status: 500, statusText: '네트워크 에러' },
    );
  }
}

/** >>>>> 크론 <<<<<< https://www.npmjs.com/package/node-cron*/

/** 작업 등록 */
function addCron(
  expression: string,
  userId: string,
  cronFunction: (...rest: any) => void,
  cronGroup: Map<any, any>,
) {
  const task = cron.schedule(expression, cronFunction, {
    scheduled: false,
    timezone: 'Asia/Seoul',
  });
  task.start();
  cronGroup.set(userId, task);
  return task;
}

/** 작업 중지 */
async function removeCron(userId: string, cronGroup: Map<any, any>) {
  const hasTask = cronGroup.has(userId);
  const task = cronGroup.get(userId);

  if (hasTask) {
    task.stop();
    cronGroup.delete(userId);
  }

  await prisma.notificationCron.delete({
    where: {
      userId,
    },
  });
}

async function sendNotification(userId: string) {
  console.log(`${userId}님에게 알림을 전송합니다.`);
}

/**
 * 크론 의미
     # ┌────────────── second (optional) 0-59
     # │ ┌──────────── minute 0-59
     # │ │ ┌────────── hour  0-23
     # │ │ │ ┌──────── day of month 1-31
     # │ │ │ │ ┌────── month 1-12 (or names)
     # │ │ │ │ │ ┌──── day of week 0-7 (or names, 0 or 7 are sunday)
     # │ │ │ │ │ │
     # │ │ │ │ │ │
     # * * * * * *
 */
