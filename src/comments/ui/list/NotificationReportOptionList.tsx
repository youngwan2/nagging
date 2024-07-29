import List from './List';
import NotificationReportOptionListItem from '../item/NotificationReportOptionListItem';
import NotificationTaskButtonContainer from '../container/NotificationTaskButtonContainer';

import { UserReportOptionList } from '@src/app/dashboard/notification-setting/page';
import Heading from '../heading/Heading';

interface PropsType {
  items: UserReportOptionList[];
}

export default function NotificationReportOptionList({ items }: PropsType) {
  if (!Array.isArray(items))
    return (
      <Heading className="text-[1em] font-light text-center mt-7" level="2">
        네트워크 문제 혹은 비로그인 상태로 인해 조회에 실패하였습니다.
      </Heading>
    );
  if (items.length < 1)
    return (
      <Heading className="text-[1em] font-light leading-6 mt-5" level="2">
        현재 생성된 보고서 옵션이 없습니다. [보고서 설정] 탭을 통해
        등록해주세요. <br />{' '}
        {
          ' There are currently no generated report options. Please register through the [Report Settings] tab.'
        }
      </Heading>
    );
  return (
    <List>
      {items.map((item) => (
        <NotificationReportOptionListItem
          key={item?.reportId}
          item={item}
          taskManagementButtons={
            <NotificationTaskButtonContainer reportId={item?.reportId} />
          }
        />
      ))}
    </List>
  );
}
