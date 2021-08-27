

export interface Cuts {
  usernameOrder: string;
  cutList: CutList[];
  stockList: StockList[];
  optionSzrank: number;
  optionStackResult: boolean;
}

export interface CutList {
  cutLength?: number;
  cutPcs?: number;
  name?: string;
  id?: number;
}

export interface StockList {
  stockLength?: number;
  stockPcs?: number;
}

