import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESMap, Map } from 'typescript';



export class ResultBarsModule {
  public resultBars?:ResultBar[];
  public resultRemainingPieces?:ResultBar[];
  public resultWaste?: number;
  public resultUsed?: number;
  public resultWasteProcent?: number;
  public resultUsedProcent?: number;
  public resultCutCount?: number;
  public resultCostOveral?: number;
  public resultNeededStock?: ESMap<number,number>;
}

export interface ResultBar {
  resultBarPieces?: ResultBarPiece[];
  stackCount:number;
  onStockLength:number;
  freeSpaceOnStock:number;
}

export class ResultBarPiece { 
  public barWidthProc: string;
  public barText: string;
}

