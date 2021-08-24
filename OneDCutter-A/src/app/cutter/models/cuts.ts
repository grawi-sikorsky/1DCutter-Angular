

export interface Cuts {
  cutList: CutList[];
  stockList: StockList[];
}

export interface CutList {
  cutLength?: number;
  cutPcs?: number;
}

export interface StockList {
  stockLength: number;
  stockPcs: number;
}

