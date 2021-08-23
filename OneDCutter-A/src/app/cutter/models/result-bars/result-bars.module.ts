import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



export class ResultBarsModule {
  public resultBarPieces:ResultBar[];
  public resultWaste: number;
  public resultUsed: number;
  public resultWasteProcent: number;
  public resultNeededStock: number;
}

export class ResultBar { 
  public barWidthProc: string;
  public barText: string;
}

