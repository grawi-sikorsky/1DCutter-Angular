import { CutOptions } from './cutoptions';


export interface ProjectModel {
  id              : number;
  projectName     : string;
  projectModified?: Date;
  projectCreated? : Date;
  projectResults  : string;
  cutList         : CutList[];
  stockList       : StockList[];
  cutOptions      : CutOptions;
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

