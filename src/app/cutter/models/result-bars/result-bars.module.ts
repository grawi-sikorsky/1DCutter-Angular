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
  public resultNeededStock?: ESMap<number,number>;
}

export interface ResultBar {
  resultBarPieces?: ResultBarPiece[];
  stackCount:number;  // nie zwracana z API, obliczana tutaj
  onStockLength:number; // nie zwracana z API!
}

export class ResultBarPiece { 
  public barWidthProc: string;
  public barText: string;
}

