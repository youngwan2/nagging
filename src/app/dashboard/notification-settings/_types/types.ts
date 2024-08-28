export interface UserReportOptionList {
  reportId: number;
  userId: string;
  task: boolean;
  report: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReportOptionInfo {
  optionList: UserReportOptionList[];
  totalCount: number;
  maxPage: number;
}
