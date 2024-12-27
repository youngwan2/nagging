import { arrayToCSV, createCsvFile, download } from '../csvUtils';

describe('csvUtils.ts', () => {
  // arrayToCSV 함수 테스트
  describe('arrayToCSV', () => {
    it('객체 배열을 CSV 형식으로 변환해야 한다', () => {
      const data = [
        { date: '2024.01.01', value: 1000 },
        { date: '2024.12.31', value: 1500 },
      ];
      const expectedCSV = 'date,value(단위: $)\n2024.01.01,1000\n2024.12.31,1500';

      // arrayToCSV 함수가 올바르게 동작하는지 확인
      expect(arrayToCSV(data)).toBe(expectedCSV);
    });
  });

  // createCsvFile 함수 테스트
  describe('createCsvFile', () => {
    it('CSV 데이터를 가진 Blob 객체를 생성해야 한다', () => {
      const csvData = 'date,value(단위: $)\n2024.01.01,1000\n2024.12.31,1500';
      const blob = createCsvFile(csvData);

      // Blob 객체가 올바르게 생성되었는지 확인
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/csv;charset=utf-8');
    });
  });

  // download 함수 테스트
  describe('download', () => {
    //memo: WIndow 전역 객체는 js dom 환경에서 인식이 안 되므로 global 전역 객체를 사용해서 jsdom 을 모킹
    /** reference: https://stackoverflow.com/questions/52968969/jest-url-createobjecturl-is-not-a-function */
    const mockCreateObjectURL = (global.URL.createObjectURL = vi.fn());
    const mockRevokeObjectURL = (global.URL.revokeObjectURL = vi.fn());

    it('앵커 요소를 생성하고 다운로드를 트리거해야 한다', () => {
      const blob = new Blob(['date,value(단위: $)\n2024.01.01,1000\n2024.12.31,1500'], {
        type: 'text/csv;charset=utf-8',
      });
      const fileName = 'test.csv';
      const clickMock = vi.fn();

      // document.createElement 함수를 모킹
      const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        tagName;
        const anchorElement = {
          href: '',
          download: '',
          click: clickMock,
        } as unknown as HTMLAnchorElement;
        return anchorElement;
      });

      // download 함수 호출
      download(blob, fileName);

      // 각 모킹된 함수들이 올바르게 호출되었는지 확인
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockCreateObjectURL).toHaveBeenCalledWith(blob);
      expect(clickMock).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalledWith(undefined);

      // 원래 구현으로 복원
      createElementSpy.mockRestore();
      mockCreateObjectURL.mockRestore();
      mockRevokeObjectURL.mockRestore();
    });
  });
});
