/** 보고서 응답 타입 */
interface Cell {
  value?: string;
}

interface Row {
  cells: Cell[];
}

interface Header {
  name: string;
  type?: string | null;
  currencyCode?: string;
}

interface TotalsOrAverages {
  cells: Cell[];
}

interface Date {
  year: number;
  month: number;
  day: number;
}

export interface ReportDataResponse {
  totalMatchedRows: string;
  headers: Header[];
  rows: Row[];
  totals: TotalsOrAverages;
  averages: TotalsOrAverages;
  startDate: Date;
  endDate: Date;
}
