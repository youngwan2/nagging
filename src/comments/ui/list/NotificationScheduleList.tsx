import { ReportOptionType } from '../../../../lib/adsense';
import Container from '../container/Container';
import NotificationScheduleButtonContainer from '../container/NotificationScheduleButtonContainer';
import { ScheduleList } from '../container/NotificationScheduleListContainer';
import ListItem from '../item/ListItem';
import Text from '../text/Text';
import List from './List';

interface PropsType {
  items: ScheduleList;
}

const TextContainer = Container;
export default function NotificationScheduleList({ items }: PropsType) {
  if (!items) return null;

  const { nextScheduleInfo, scheduleList } = items;

  return (
    <List className="space-y-6">
      {scheduleList?.map((schedule) => {
        const reportId = schedule.notificationReports.reportId;
        const report = stringParser(schedule.notificationReports.report);
        const reportName = report.reportName;

        return (
          <ListItem
            key={schedule.createdAt}
            className="dark:bg-[rgba(0,0,0,0.3)] p-4 rounded-md border"
          >
            {/* 개요 */}
            <TextContainer elName={'div'} className="flex flex-col">
              <Text elementName={'p'} className="text-sm">
                <span className=" rounded-t-sm p-[0.5px] inline-block font-semibold dark:text-white mr-2">
                  보고서 식별코드:{' '}
                </span>
                <span className="dark:text-white">{reportId}</span>
              </Text>
              <Text elementName={'p'} className="text-sm">
                <span className=" rounded-t-sm p-[0.5px] inline-block font-semibold dark:text-white mr-2">
                  보고서명:{' '}
                </span>
                <span className="dark:text-white">{reportName}</span>
              </Text>
              <Text elementName={'p'} className="text-sm col-span-2">
                <span className=" rounded-t-sm p-[0.5px] inline-block font-semibold dark:text-white mr-2">
                  등록날짜:{' '}
                </span>
                <span className="dark:text-white">
                  {new Date(schedule.createdAt).toLocaleString('ko-KR')}
                </span>
              </Text>
            </TextContainer>

            {/* 다음 알림 안내 */}
            {Object.entries(nextScheduleInfo)?.map(
              ([userId, { reportId: scheduleReportId, nextScheduleInfo }]) =>
                scheduleReportId === reportId && (
                  <TextContainer elName={'div'} key={userId} className="mt-1">
                    <Text elementName={'p'} className="text-sm mb-1">
                      <span className=" rounded-t-sm p-[0.5px] inline-block font-semibold dark:text-white mr-2">
                        다음 알림:{' '}
                      </span>
                      <span className="dark:text-white">
                        {nextScheduleInfo.nextReminder}
                      </span>
                    </Text>
                    <Text elementName={'p'} className="text-sm">
                      <span className=" rounded-t-sm p-[0.5px] inline-block font-semibold dark:text-white mr-2">
                        다다음 알림:{' '}
                      </span>
                      <span className="dark:text-white">
                        {nextScheduleInfo.subsequentReminder}
                      </span>
                    </Text>
                  </TextContainer>
                ),
            )}
            {/* 스케줄 취소 버튼 */}
            <NotificationScheduleButtonContainer reportId={reportId} />
          </ListItem>
        );
      })}
    </List>
  );
}

function stringParser(json: string) {
  const parsedJson: ReportOptionType = JSON.parse(json);
  return parsedJson;
}
