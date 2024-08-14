import Heading from '../heading/Heading';
import Container from './Container';
import HomeCard from '../card/HomeCard';
import Text from '../text/Text';

import { auth } from '@src/auth';
import { Session } from 'next-auth';
import { getSchedule } from '@src/services/notification.service';
import { getAdsenseAlert } from '@src/services/adsense.service';
import Link from 'next/link';

export default async function AlertCardContainer() {
  const session = (await auth()) as Session;
  const { userId = '', access_token = '' } = session || {
    userId: '',
    access_token: '',
  };

  const alerts = await getAdsenseAlert(userId, access_token);
  const scheduleInfos = await getSchedule(userId);

  const report = parseReportJson(
    scheduleInfos.notificationReports?.report || '',
  );

  return (
    <Container elName={'div'} className="w-full">
      <Heading level="2" className="pb-[0.75em]">
        알림/공지
        <Text elementName={'span'} className="text-[0.55em] pl-4 text-gray-500">
          Alerts/Board
        </Text>
      </Heading>
      {/* 애드센스 알림*/}
      {alerts ? (
        alerts?.map((alert) => {
          return (
            <HomeCard
              key={alert.name}
              koTitle={replaceSeverity(alert.severity || '')}
              text={alert.message || ''}
              enTitle={alert.severity || ''}
            />
          );
        })
      ) : (
        <Text elementName={'p'}>
          - 현재는 애드센스 소식이 존재하지 않습니다.
        </Text>
      )}

      {/* 예약된 알림 */}
      {scheduleInfos.nextReminder ? (
        <HomeCard
          koTitle={report.reportName}
          href="/dashboard/notification-settings"
          text={`${scheduleInfos.nextReminder} 및 ${scheduleInfos.subsequentReminder} 으로 설정된 알림이 있습니다. 상기일에 맞춰 설정한 보고서를 메일로 전달해 드립니다.`}
        />
      ) : (
        <Text elementName={'p'} className="min-h-[120px]  my-3">
          - 현재는 예약된 알림이 존재하지 않습니다.{' '}
          <Link
            href={'/dashboard/notification-settings'}
            className="underline hover:text-gray-400 font-bold"
          >
            [보고서 알림 설정]
          </Link>
          을 통해 일정을 등록해주세요.
        </Text>
      )}
    </Container>
  );
}

function replaceSeverity(enSeverity: string) {
  if (enSeverity === 'WARNING') return '경고';
  if (enSeverity === 'SEVERE') return '심각';
  if (enSeverity === 'INFO') return '정보';
  return '일반';
}

function parseReportJson(reportJson: string) {
  if (!reportJson) return 'JSON 형식이 아니므로 변환이 불가능 합니다.';

  return JSON.parse(reportJson) || {};
}
