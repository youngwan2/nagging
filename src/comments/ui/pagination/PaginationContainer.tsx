'use client';

import { Pagination } from '@nextui-org/pagination';

interface PropsType {
  /** default: 10 */
  total: number;
  /** default: 1 */
  initialPage: number;
  onChange: (page: number) => void;
}

export default function PaginationContainer({ total = 10, initialPage = 1, onChange }: PropsType) {
  return (
    <Pagination
      color="default"
      className="mt-4 flex justify-center"
      total={total}
      initialPage={initialPage}
      onChange={(page) => {
        onChange(page);
      }}
    />
  );
}
