import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResultBarsModule { 
  resultBar:ResultBar[];
}
export class ResultBar { 
  barWithProc: string;
  barText: string;
}