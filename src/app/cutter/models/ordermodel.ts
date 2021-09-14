import { CutOptions } from './cutoptions';


export interface OrderModel {
  cutList: CutList[];
  stockList: StockList[];
  cutOptions: CutOptions;
  usernameOrder: string;
  optionSzrank: number;       // out?
  optionStackResult: boolean; // out?
}

export interface CutList {
  cutLength?: number;
  cutPcs?: number;
  name?: string;
  id?: number;
}

export interface StockList {
  idFront?: number;
  stockLength?: number;
  stockPcs?: number;
  stockPrice?:number;
}

