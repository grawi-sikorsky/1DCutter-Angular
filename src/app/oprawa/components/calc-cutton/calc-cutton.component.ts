import { Component, OnInit } from '@angular/core';
import { CutFormComponent } from '../../../cutter/components/cut-form/cut-form.component';
import { ResultService } from '../../../cutter/services/result.service';

@Component({
  selector: 'app-calc-cutton',
  templateUrl: './calc-cutton.component.html',
  styleUrls: ['./calc-cutton.component.css']
})
export class CalcCuttonComponent implements OnInit {

  constructor(private cutformComponent : CutFormComponent, private resultService:ResultService) { }

  ngOnInit(): void {
  }

  public onClickCalculate(){
    this.cutformComponent.submitOrder();
  }

  public isLoadingResults(){
    if( this.resultService.isWorking ){
      return true;
    }
    else return false;
  }
}
