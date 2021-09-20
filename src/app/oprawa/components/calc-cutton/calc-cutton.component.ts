import { Component, OnInit } from '@angular/core';
import { CutFormComponent } from '../../../cutter/components/cut-form/cut-form.component';

@Component({
  selector: 'app-calc-cutton',
  templateUrl: './calc-cutton.component.html',
  styleUrls: ['./calc-cutton.component.css']
})
export class CalcCuttonComponent implements OnInit {

  constructor(private cutformComponent : CutFormComponent) { }

  ngOnInit(): void {
  }

  public onClickCalculate(){
    this.cutformComponent.submitOrder();
  }
}
