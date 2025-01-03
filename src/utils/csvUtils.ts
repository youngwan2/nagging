import { ArrayToCsvProps } from '@src/types/csv.types';

/** 배얼을 CSV 포맷으로 변경
 * @description 첫 행을 객체 배열의 key 인 date, value 으로 구분하고, 두 번째 행부터 date, value 의 각 셀을 한 묶으로 개행하며 배치
 */
export const arrayToCSV: ArrayToCsvProps = (array) => {
  const headers = Object.keys(array[0]).join(',').replace('value', 'value(단위: $)');
  const rows = array.map((obj) => Object.values(obj).join(',')).join('\n'); // date, value을 하나의 쌍으로 개행하며 배치
  return `${headers}\n${rows}`;
};

/** CSV 파일 생성 */
export const createCsvFile = (csvFormatData: string) => {
  return new Blob([csvFormatData], { type: 'text/csv;charset=utf-8' });
};

/** 생성한 CSV 다운로드 */
export const download = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob); // ex) blob:url 형태
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url); // 다운로드 후 삭제
};
