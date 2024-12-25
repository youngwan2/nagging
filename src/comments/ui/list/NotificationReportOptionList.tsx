import List from './List';
import NotificationReportOptionListItem from '../item/NotificationReportOptionListItem';
import NotificationTaskButtonContainer from '../container/NotificationTaskButtonContainer';
import EmptyMessage from '../message/EmptyMessage';
import { type UserReportOptionList } from '@src/app/dashboard/notification-settings/_types/types';

interface PropsType {
  items: UserReportOptionList[];
  onDeleteReportSubmit: (postId: number) => void;
}

export default function NotificationReportOptionList({ items, onDeleteReportSubmit }: PropsType) {
  if (items.length < 1)
    return (
      <EmptyMessage
        className="mt-4"
        title="생성된 보고서 옵션이 없습니다."
        message="현재 생성된 보고서 옵션이 없습니다. [보고서 설정] 탭을 통해 등록해주세요."
      />
    );
  return (
    <List>
      {items.map((item) => (
        <NotificationReportOptionListItem
          key={item.reportId}
          item={item}
          taskManagementButtons={
            // 알림 작업 버튼
            <NotificationTaskButtonContainer reportId={item.reportId} onDeleteReportSubmit={onDeleteReportSubmit} />
          }
        />
      ))}
    </List>
  );
}
