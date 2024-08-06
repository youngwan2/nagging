// interface PropsType { }

import { getAdsenseAlert } from '@src/services/adsense.service';
import Heading from '../heading/Heading';
import Container from './Container';
import { auth } from '@src/auth';
import { Session } from 'next-auth';
import HomeCard from '../card/HomeCard';
import { getSchedule } from '@src/services/notification.service';

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
        알림
        <span className="text-[0.55em] pl-4 text-gray-500">Alerts</span>
      </Heading>
      {/* 애드센스 자체 알림 */}
      {alerts?.map((alert) => {
        return (
          <HomeCard
            key={alert.name}
            koTitle={replaceSeverity(alert.severity || '')}
            text={alert.message || ''}
            enTitle={alert.severity || ''}
          />
        );
      })}
      {/* 예약된 알림 */}
      <HomeCard
        koTitle={report.reportName}
        href="/dashboard/notification-settings"
        text={`${scheduleInfos.nextReminder} 및 ${scheduleInfos.subsequentReminder} 으로 설정된 알림이 있습니다. 상기일에 맞춰 설정한 보고서를 메일로 전달해 드립니다.`}
      />
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
