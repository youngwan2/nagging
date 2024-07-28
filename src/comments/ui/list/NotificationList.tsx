import { UserReportOptionList } from '@src/app/dashboard/notification-setting/page';
import List from './List';
import ListItem from '../item/ListItem';
import ItemTitle from '../heading/Heading';
import Text from '../text/Text';
import Flex from '../container/Container';
import Container from '../container/Container';

interface PropsType {
  items: UserReportOptionList[];
}
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

export default function NotificationList({ items }: PropsType) {
  return (
    <List>
      {items.map((item) => {
        const report: ReportFilter = JSON.parse(item.report);
        const createDate = new Date(item.createdAt).toLocaleString('ko-KR');
        const dimensions = report.dimensions;

        return (
          <ListItem className="border rounded-md p-2 mt-3" key={item.reportId}>
            <ItemTitle className="text-[1.05em]" level="3">
              {report.reportName}
            </ItemTitle>
            <hr className="p-1" />

            <Container elName={'div'}>
              <p>
                <Flex elName={'span'} className="flex">
                  <Text elementName={'span'} className="font-bold">
                    생성 날짜:
                  </Text>
                  <Text className="px-1" elementName={'span'}>
                    {' '}
                    {createDate} 생성됨
                  </Text>
                </Flex>

                {report.dateRange === 'CUSTOM' && (
                  <Flex elName={'span'} className="flex">
                    <Text elementName={'span'} className="font-bold">
                      조회 기간:{' '}
                    </Text>
                    <Text elementName="span" className="px-1">
                      {report.startDate.year}.{report.startDate.day}.
                      {report.startDate.month} ~ {report.endDate.year}.
                      {report.endDate.day}.{report.endDate.month}
                    </Text>
                  </Flex>
                )}
                <Flex elName={'span'} className="flex">
                  <Text elementName={'span'} className="font-bold">
                    조회 항목:
                  </Text>
                  {report.metrics.map((metric) => {
                    return (
                      <Text
                        elementName={'span'}
                        key={metric}
                        className=" border  mx-1 rounded-[10px] px-1"
                      >
                        {metric === 'CLICKS'
                          ? '광고 클릭 횟수'
                          : metric === 'COST_PER_CLICK'
                            ? '클릭 당 수익'
                            : metric === 'ESTIMATED_EARNINGS'
                              ? '추정 수익'
                              : '조회항목 없음'}
                      </Text>
                    );
                  })}
                </Flex>
                <Flex elName={'span'} className="flex">
                  <Text elementName={'span'} className="font-bold">
                    조회 기준:
                  </Text>
                  <Text
                    elementName={'span'}
                    key={dimensions}
                    className=" border mx-1 rounded-[10px] px-1"
                  >
                    {dimensions === 'MONTH'
                      ? '월 단위'
                      : dimensions === 'WEEK'
                        ? '주 단위'
                        : dimensions === 'DATE'
                          ? '일 단위'
                          : '조회항목 없음'}
                  </Text>
                </Flex>
              </p>
            </Container>
          </ListItem>
        );
      })}
    </List>
  );
}
