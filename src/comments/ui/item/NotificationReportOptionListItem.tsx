import ListItem from '../item/ListItem';
import ItemTitle from '../heading/Heading';
import Text from '../text/Text';
import Container from '../container/Container';
import { UserReportOptionList } from '@src/app/dashboard/notification-settings/page';

import { MdOutlineNotifications } from 'react-icons/md';

interface DateType {
  day: number;
  month: number;
  year: number;
}

interface ReportFilter {
  reportName: string;
  dateRange: 'CUSTOM'; // 예시로 다른 날짜 범위도 추가
  dimensions: 'DATE' | 'WEEK' | 'MONTH';
  startDate: DateType;
  endDate: DateType;
  metrics: ('ESTIMATED_EARNINGS' | 'CLICKS' | 'COST_PER_CLICK')[];
  reportingTimeZone: 'ACCOUNT_TIME_ZONE';
  currencyCode: string;
}

interface PropsType {
  item: UserReportOptionList;
  taskManagementButtons: React.ReactNode;
}

const ItemBody = Container;
const TextContainer = Container;
export default function NotificationReportOptionListItem({
  item,
  taskManagementButtons,
}: PropsType) {
  const report: ReportFilter = JSON.parse(item.report);
  const createDate = new Date(item.createdAt).toLocaleString('ko-KR');
  const dimensions = report.dimensions;

  return (
    <ListItem
      className="shadow-[0_2px_3px_0_rgba(0,0,0,0.2)] dark:border dark:border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden mt-3 animate-appearance-in"
      key={item.reportId}
    >
      {/* 보고서 이름 */}
      <ItemTitle
        className="text-[1.05em] flex items-center p-3 px-4 dark:bg-[#212125] bg-[#fbfbfb] border-b border-b-slate-200 relative  "
        level="3"
      >
        {report.reportName}
        {item.task ? <NotificationIcon /> : null}
      </ItemTitle>

      {/* 각 보고서 옵션*/}
      <ItemBody elName={'details'} className="p-2 dark:text-white">
        {/* 식별 */}
        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            보고서 식별코드
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {item.reportId}
          </Text>
        </TextContainer>
        {/* 조회 기간 */}
        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            생성 날짜
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {createDate}
          </Text>
        </TextContainer>
        {/* 조회 기간 */}
        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 기간
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {report.startDate.year}.{report.startDate.month}.
            {report.startDate.day} ~{report.endDate.year}.{report.endDate.month}
            .{report.endDate.day}
          </Text>
        </TextContainer>

        {/* 조회 항목 */}
        <TextContainer elName={'div'} className="flex flex-col  my-[0.5rem]">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 항목
          </Text>
          <Text elementName="span" className="px-1 font-bold">
            {report.metrics.length < 1 ? (
              <span className="mx-1">-</span>
            ) : (
              report.metrics.map((metric, index) => (
                <span key={index} className="mx-1">
                  {metric === 'CLICKS'
                    ? '광고 클릭 횟수 '
                    : metric === 'COST_PER_CLICK'
                      ? '클릭 당 수익 '
                      : metric === 'ESTIMATED_EARNINGS'
                        ? '추정 수익'
                        : '조회항목 없음'}
                </span>
              ))
            )}
          </Text>
        </TextContainer>
        {/* 조회 기준 */}
        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 기준
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {dimensions === 'MONTH'
              ? '월 단위'
              : dimensions === 'WEEK'
                ? '주 단위'
                : dimensions === 'DATE'
                  ? '일 단위'
                  : '조회항목 없음'}
          </Text>
        </TextContainer>

        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            화폐 단위
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {report.currencyCode}
          </Text>
        </TextContainer>

        {/* 스케줄 관리 */}
        {taskManagementButtons}
      </ItemBody>
    </ListItem>
  );
}

function NotificationIcon() {
  return (
    <div
      className="absolute right-2"
      aria-label="알림이 활성화됨"
      title="알림 활성화 표시 아이콘"
    >
      <MdOutlineNotifications className="w-5 h-5 text-gray-500 dark:text-orange-300 " />
      <div className="absolute -top-1 -right-1 w-2 h-2 dark:bg-orange-300 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );
}
