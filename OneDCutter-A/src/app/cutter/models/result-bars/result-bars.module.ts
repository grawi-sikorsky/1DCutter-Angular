import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



export class ResultBarsModule {
  public resultBars?:ResultBar[];
  public resultRemainingPieces?:ResultBar[];
  public resultWaste?: number;
  public resultUsed?: number;
  public resultWasteProcent?: number;
  public resultUsedProcent?: number;
  public resultNeededStock?: number;
}

export interface ResultBar {
  resultBarPieces?: ResultBarPiece[];
}

export class ResultBarPiece { 
  public barWidthProc: string;
  public barText: string;
}

