import cron from 'node-cron';
import prisma from '../../prisma/client';

/** >>>>> 크론 <<<<<< https://www.npmjs.com/package/node-cron*/

/** 작업 등록 */
export function addCron(
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
export async function removeCron(userId: string, cronGroup: Map<any, any>) {
  const hasTask = cronGroup.has(userId);
  const task = cronGroup.get(userId);

  if (hasTask) {
    task.stop();
    cronGroup.delete(userId);
  }

  try {
    await prisma.notificationCron.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error('데이터베이스에서는 크론이 존재하지 않음');
  }
}

export async function sendNotification(userId: string) {
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

/** 크론 설명
* * * * *   --> 실행할 표현식
- - - - -
| | | | |
| | | | +----- 요일 (0 - 6) (일요일=0)
| | | +------- 월 (1 - 12)
| | +--------- 일 (1 - 31)
| +----------- 시간 (0 - 23)
+------------- 분 (0 - 59)
*/

/** 표현식 기호 */
// *: 모든 가능한 값을 의미합니다. 예를 들어, 분 필드에 *를 사용하면 매 분마다 작업이 실행됩니다.
// ,: 여러 값을 구분하는 데 사용됩니다. 예를 들어, 1,15는 1분과 15분에 작업이 실행됨을 의미합니다.
// -: 범위를 나타냅니다. 예를 들어, 1-5는 1부터 5까지의 값을 의미합니다.
// /: 간격을 나타냅니다. 예를 들어, */10은 매 10분마다 작업이 실행됨을 의미합니다.

/** 예시 */
// 매일 오전 3시에 스크립트 실행        : 0 3 * * * /path/to/script.sh
// 매 시간 15분마다 작업 실행           : 15 * * * * /path/to/command
// 매주 월요일 오전 6시에 작업 실행      : 0 6 * * 1 /path/to/command
// 매월 1일과 15일 오후 2시에 작업 실행  : 0 14 1,15 * * /path/to/command
// 주중 (월-금) 매일 오후 5시에서 10분 간격으로 작업 실행: // */10 17 * * 1-5 /path/to/command
