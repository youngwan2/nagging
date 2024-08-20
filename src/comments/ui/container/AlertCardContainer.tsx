import Heading from '../heading/Heading';
import Container from './Container';
import HomeCard from '../card/HomeCard';
import Text from '../text/Text';
import EmptyMessage from '../message/EmptyMessage';

import { auth } from '@src/auth';
import { Session } from 'next-auth';
import { getSchedule } from '@src/services/notification.service';
import { getAdsenseAlert } from '@src/services/adsense.service';

export default async function AlertCardContainer() {
  const session = (await auth()) as Session;
  const { userId = '', access_token = '' } = session || {
    userId: '',
    access_token: '',
  };

  const alerts = await getAdsenseAlert(userId, access_token);
  const scheduleInfos = await getSchedule(userId);

  const report = parseReportJson(scheduleInfos.notificationReports?.report || '');

  return (
    <Container elName={'div'} className="w-full">
      <Heading level="2" className="pb-[0.75em]">
        알림/공지
        <Text elementName={'span'} className="text-[0.55em] dark:text-[#777f8e] pl-4 opacity-80 ">
          Alerts/Board
        </Text>
      </Heading>
      <Heading level="3">애드센스 알림</Heading>
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
        <EmptyMessage
          className="mt-3"
          title="애드센스 알림 없음"
          message="조회된 애드센스 알림이 없습니다. 자세한 사항은 애드센스 사이트를 방문해주세요."
        />
      )}

      {/* 보고서 일정 알림 */}
      <Heading level="3" className="mt-5 pt-3">
        보고서 일정 알림
      </Heading>

      {scheduleInfos.nextReminder ? (
        <HomeCard
          koTitle={report.reportName}
          href="/dashboard/notification-settings"
          text={`${scheduleInfos.nextReminder} ~ ${scheduleInfos.subsequentReminder} 으로 설정된 알림이 있습니다. 자세한 설정은 [보고서 설정] 페이지에서 확인 바랍니다.`}
        />
      ) : (
        <EmptyMessage
          className="mt-4 border border-[rgba(255,255,255,0.1)] ml-2"
          title="등록된 보고서 알림 없음"
          message="현재 등록된 보고서 알림이 없습니다. [보고서 설정] 페이지를 통해 새로운 알림을 등록해주세요."
        />
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
