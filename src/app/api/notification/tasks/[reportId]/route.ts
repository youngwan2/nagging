import cron, { validate } from 'node-cron';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import { connect } from '../../../../../../prisma/client';

import { auth } from '@src/auth';
import { createTask, getReportOptionFromDb, removeTask, sendNotification } from '@src/task';

const cronGroup = cron.getTasks();

/** POST | 사용자 예약 알림 크론 추가 처리 */
export async function POST(req: NextRequest, res: { params: { reportId: number } }) {
  const { prisma, close } = await connect();

  const immediate = req.url.includes('immediate=true'); // 즉시 알림을 받을 것인지 유무 체크
  const reportId = Number(res.params.reportId);
  const json = immediate === false ? await req.json() : null;

  const {
    userId,
    access_token: accessToken = '',
    user,
  } = ((await auth()) as Session) || { userId: '', accessToken: '' };

  const cronExpression = json ? json.cron || { cron: null } : null;
  const userEmail = user?.email || '';
  const isCron = cronExpression ? validate(cronExpression) : false;

  try {
    // 로그인 유저인지 확인
    if (!userId || !user) return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 401 });

    // 예약할 보고서 옵션 가져오기
    const reportOptionJSON = await getReportOptionFromDb(reportId, userId);

    if (!reportOptionJSON) {
      return NextResponse.json({ error: '등록된 보고서 옵션이 아닙니다.' });
    }

    // 사용자가 보고서 알림을 즉시 받기를 원하는 경우 금일 날짜로 보고서 전송
    if (immediate === true) {
      await sendNotification(userId, reportOptionJSON, accessToken, userEmail);

      return NextResponse.json({ message: '즉시 보고서 전송 완료' });
    }

    // 크론 표현식이 올바른 형식인지 확인
    if (!isCron) return NextResponse.json({ error: '크론이 아닙니다.' });

    // 유저 아이디를 사용하여 예약된 크론이 존재하는지 데이터베이스에서 확인
    const userCronInfo = (
      await prisma.notificationCron.findMany({
        where: { userId },
      })
    )[0];

    const isRegistered = userCronInfo ? userCronInfo.userId === userId : false; // 데이터베이스 등록 유무

    // UPDATE |  기존 작업 존재 시, 새 작업으로 대체
    if (isRegistered) {
      removeTask(userId);
      const task = createTask(
        cronExpression,
        () => console.log(new Date()),
        // sendNotification(userId, reportOptionJSON, accessToken, userEmail),
        userId,
      );

      // 기존 작업을 다른 작업으로 대체
      await prisma.notificationCron.update({
        data: {
          cronExpression: cronExpression,
          reportId: reportId,
        },
        where: { userId },
      });

      // reportId 와 일치하는 task 는 true 로 변경(사용자가 선택한 보고서 알림 활성화)
      await prisma.notificationReports.update({
        data: {
          task: true,
        },
        where: {
          reportId,
        },
      });

      // reportId 를 제외한 유저의 task 는 false 로 변경(선택 이외의 보고서 알림 비활성화)
      await prisma.notificationReports.updateMany({
        data: {
          task: false,
        },
        where: {
          userId,
          NOT: {
            reportId,
          },
        },
      });

      // 작업 시작
      task.start();

      return NextResponse.json({ message: '선택하신 옵션으로 알림이 재설정 되었습니다.' }, { status: 201 });

      // CREATE | 새 작업 등록
    } else {
      // 새 작업 생성
      const task = createTask(
        cronExpression,
        () => console.log(new Date()),
        // sendNotification(userId, reportOptionJSON, accessToken, userEmail),
        userId,
      );

      // 새 작업 저장
      await prisma.notificationCron.create({
        data: {
          task: '',
          cronExpression,
          userId,
          reportId: reportId,
        },
      });

      // 알림 등록할 보고서 옵션 활성화
      await prisma.notificationReports.update({
        data: {
          task: true,
        },
        where: {
          reportId,
        },
      });

      // 작업 실행
      task.start();
      return NextResponse.json({ message: '보고서 알림 등록 성공.' }, { status: 201 });
    }
  } catch (error) {
    console.error('작업등록 실패:', error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500, statusText: '네트워크 에러' });
  } finally {
    await close();
  }
}

/** DELETE | 사용자 예약 알림 크론 삭제 처리 */
export async function DELETE(_req: NextRequest, res: { params: { reportId: number } }) {
  if (cronGroup.size === 0) {
    return NextResponse.json({ message: '예약된 알림이 존재하지 않습니다.' });
  }

  const { prisma, close } = await connect();

  try {
    const { userId } = ((await auth()) as Session) || { userId: '' };
    const reportId = Number(res.params.reportId);

    // 로그인 유저인지 확인
    if (!userId) return NextResponse.json({ error: '접근 권한이 없습니다.' }, { status: 401 });

    const userCronInfo =
      (await prisma.notificationCron.findMany({
        where: { userId },
      })) || [];

    // 크론 작업 존재 유무 확인
    const hasTask = cronGroup.has(userId); // map 크론
    const isStoredTask = userCronInfo.length > 0; // 데이터베이스 크론

    // reportId 로 등록된 보고서가 활성화 상태인지 확인
    const activeTask = (
      await prisma.notificationReports.findMany({
        select: {
          task: true,
        },
        where: {
          reportId,
        },
      })
    )[0].task;

    if (activeTask === false) {
      return NextResponse.json({
        message: '해당 보고서의 예약 알림은 존재하지 않습니다.',
      });
    }

    // 작업 제거
    if (isStoredTask && hasTask) {
      removeTask(userId);

      // 크론 등록에 사용된 보고서 비활성화
      await prisma.notificationReports.updateMany({
        data: {
          task: false,
        },
        where: {
          reportId,
        },
      });
      // 크론 삭제
      await prisma.notificationCron.delete({
        where: {
          userId,
        },
      });

      return NextResponse.json({ message: '알림 취소 완료' });
    }

    // 아에 존재하지 않는 경우
    if (!isStoredTask && !hasTask) {
      return NextResponse.json({ message: '처리할 작업이 없음' }, { status: 404 });
    }

    return NextResponse.json({ message: '알림 취소 완료' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '네트워크 에러' }, { status: 500 });
  } finally {
    await close();
  }
}
