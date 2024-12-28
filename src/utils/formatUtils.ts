import { FlattenedData, Row } from '@src/types/analytics.types';

/** 보고서 중첩배열 평탄화 */
export function flattenRows(rows: Row[]): FlattenedData[] {
  if (!rows || rows?.length === 0) return [];
  return rows.map((row) => {
    return {
      date: row.cells[0].value,
      value: Number(row.cells[1].value),
    };
  });
}
