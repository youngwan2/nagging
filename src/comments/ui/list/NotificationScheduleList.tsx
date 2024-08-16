import React from 'react';

import NotificationScheduleButtonContainer from '../container/NotificationScheduleButtonContainer';
import List from './List';
import ListItem from '../item/ListItem';

import type { ReportOptionType } from '@src/services/adsense.service';
import getIcons from '@src/utils/icons';

interface PropsType {
  items: ScheduleList;
}

export default function NotificationScheduleList({ items }: PropsType) {
  if (!items) return null;

  const { nextScheduleInfo, scheduleList } = items;
  const { AlertCircleIcon, ClockIcon, CalendarIcon } = getIcons();

  return (
    <List className="space-y-6">
      {scheduleList?.map((schedule) => {
        const reportId = schedule.notificationReports.reportId;
        const report = stringParser(schedule.notificationReports.report);
        const reportName = report.reportName;

        return (
          <ListItem
            key={schedule.createdAt}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            {/* 보고서 식별코드/보고서명/등록날짜 */}
            <div className="space-y-3">
              <InfoRow
                icon={<AlertCircleIcon />}
                label="보고서 식별코드"
                value={reportId}
              />
              <InfoRow
                icon={<ClockIcon />}
                label="보고서명"
                value={reportName}
              />
              <InfoRow
                icon={<CalendarIcon />}
                label="등록날짜"
                value={new Date(schedule.createdAt).toLocaleString('ko-KR')}
              />
            </div>

            {/* 다음/다다음 알림 */}
            {Object.entries(nextScheduleInfo)?.map(
              ([userId, { reportId: scheduleReportId, nextScheduleInfo }]) =>
                scheduleReportId === reportId && (
                  <div key={userId} className="mt-4 space-y-2">
                    <InfoRow
                      icon={<CalendarIcon />}
                      label="다음 알림"
                      value={nextScheduleInfo.nextReminder}
                    />
                    <InfoRow
                      icon={<CalendarIcon />}
                      label="다다음 알림"
                      value={nextScheduleInfo.subsequentReminder}
                    />
                  </div>
                ),
            )}
            {/* 취소 버튼 */}
            <NotificationScheduleButtonContainer reportId={reportId} />
          </ListItem>
        );
      })}
    </List>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center text-gray-700 dark:text-gray-300">
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );
}

/** JSON 데이터를 자바스크립트 객체로 변환 */
function stringParser(json: string): ReportOptionType {
  return JSON.parse(json);
}

// 타입

interface ScheduleList {
  nextScheduleInfo: {
    [userId: string]: {
      reportId: string;
      nextScheduleInfo: {
        nextReminder: string;
        subsequentReminder: string;
      };
    };
  };
  scheduleList: Array<{
    createdAt: string;
    notificationReports: {
      reportId: string;
      report: string;
    };
  }>;
}
