interface Cell {
  value: string;
}

export interface Row {
  cells: Cell[];
}

export interface FlattenedData {
  date: string;
  value: number;
}
