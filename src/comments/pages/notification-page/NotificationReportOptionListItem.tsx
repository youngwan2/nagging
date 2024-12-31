import ListItem from '../../ui/item/ListItem';
import ItemTitle from '../../ui/heading/Heading';
import Text from '../../ui/text/Text';
import Container from '../../ui/container/Container';

import { MdOutlineNotifications } from 'react-icons/md';
import { type UserReportOptionList } from '@src/app/dashboard/notification-settings/_types/types';
import { type ReportFilter } from '@src/types/report.types';
import { metrics } from '@src/constants/report';

interface PropsType {
  item: UserReportOptionList;
  taskManagementButtons: React.ReactNode;
}

const ItemBody = Container;
const TextContainer = Container;
export default function NotificationReportOptionListItem({ item, taskManagementButtons }: PropsType) {
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
        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            보고서 식별코드
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {item.reportId}
          </Text>
        </TextContainer>

        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            생성 날짜
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {createDate}
          </Text>
        </TextContainer>

        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 기간
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {report.startDate.year}.{report.startDate.month}.{report.startDate.day} ~{report.endDate.year}.
            {report.endDate.month}.{report.endDate.day}
          </Text>
        </TextContainer>

        <TextContainer elName={'div'} className="flex flex-col  my-[0.5rem]">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 항목
          </Text>
          <Text elementName="span" className="px-1 font-bold">
            {report.metrics.length < 1 ? (
              <span className="mx-1">-</span>
            ) : (
              report.metrics.map((metric, index) => (
                <span key={index} className="m-1 ">
                  {`${getMetricsText(metric)}`} <br />
                </span>
              ))
            )}
          </Text>
        </TextContainer>

        <TextContainer elName={'div'} className="flex flex-col">
          <Text elementName={'span'} className="p-1 font-light text-[0.85em]">
            조회 단위(차원)
          </Text>
          <Text elementName="span" className="px-1 mx-1 font-bold">
            {dimensions[0] === 'MONTH'
              ? '월 단위'
              : dimensions[0] === 'WEEK'
                ? '주 단위'
                : dimensions[0] === 'DATE'
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
    <div className="absolute right-2" aria-label="알림이 활성화됨" title="알림 활성화 표시 아이콘">
      <MdOutlineNotifications className="w-5 h-5 text-gray-500 dark:text-orange-300 " />
      <div className="absolute -top-1 -right-1 w-2 h-2 dark:bg-orange-300 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );
}

/** 지표 목록과 일치하는 타겟이 존재하면 해당 지표의 한글 텍스트를 반환한다. */
function getMetricsText(targetMetricValue: string) {
  return metrics.find((metric) => metric.value === targetMetricValue)?.text ?? '조회항목 없음';
}
