import List from '../../ui/list/List';
import NotificationReportOptionListItem from './NotificationReportOptionListItem';
import NotificationTaskButtonContainer from './NotificationTaskButtonContainer';
import EmptyMessage from '../../ui/message/EmptyMessage';
import { type UserReportOptionList } from '@src/app/dashboard/notification-settings/_types/types';

interface PropsType {
  optionList: UserReportOptionList[];
  onDeleteReportSubmit: (postId: number) => void;
}

export default function NotificationReportOptionList({ optionList, onDeleteReportSubmit }: PropsType) {
  if (optionList.length < 1)
    return (
      <EmptyMessage
        className="mt-4"
        title="생성된 보고서 옵션이 없습니다."
        message="현재 생성된 보고서 옵션이 없습니다. [보고서 설정] 탭을 통해 등록해주세요."
      />
    );
  return (
    <List>
      {optionList.map((item) => (
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
