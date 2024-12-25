/** @src/types/csv.types.ts */
export interface ArrayToCsvProps {
  (
    array: {
      date: string;
      value: number;
    }[],
  ): string;
}
