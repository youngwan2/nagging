import parser from 'cron-parser';
import cron from 'node-cron';

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

      const nextReminder = new Date(interval.next().toString()).toLocaleString();
      const subsequentReminder = new Date(interval.next().toString()).toLocaleString();

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
