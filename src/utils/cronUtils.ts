import parser from 'cron-parser';
import cron, { validate } from 'node-cron';

// reference: https://github.com/harrisiirak/cron-parser#readme

function genOptions(currentDate: Date) {
  // 10년 뒤의 날짜 계산
  const endDate = new Date(currentDate);
  endDate.setFullYear(endDate.getFullYear() + 10);

  return {
    currentDate: new Date(Date.now()),
  };
}
/**
 * 다음 알림 일정을 계산하여 반환
 * @param standardDate 기준이 되는 날짜
 * @param cronExpression 크론 표현식
 * @returns 다음과 다다음 알림 일정을 반환
 */
export function cronParser(standardDate: Date, cronExpression: string) {
  const isCron = cron.validate(cronExpression);

  if (!isCron) {
    return false;
  } else {
    try {
      const options = genOptions(standardDate);
      const interval = parser.parseExpression(cronExpression, options);

      const nextReminder = new Date(interval.next().toString()).toLocaleString(); // 다음 알림
      const subsequentReminder = new Date(interval.next().toString()).toLocaleString(); // 다다음 알림

      return {
        nextReminder,
        subsequentReminder,
      };
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}

/**
 * 올바른 크론표현식인지 검증
 * @param cronExpression 크론표현식
 */
export async function validateCronExpression(cronExpression: string) {
  const isValid = validate(cronExpression);
  if (!isValid) {
    throw new Error('올바른 표현식이 아닙니다.');
  }
}
