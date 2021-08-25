import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cuts } from '../../models/cuts';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  dynamicFormArray = <Cuts>{};

  constructor(private http: HttpClient, private cutService:CutterServiceService, private cutterComp:CutterComponent) { 


    this.cutService.getCutsAsync().subscribe( data => {
      this.dynamicFormArray = data;
      console.log(this.dynamicFormArray);
    })
  }

  ngOnInit(): void {

  }


  public submitOrder()
  {
    console.log("Submitting order...");

    //this.cutService.sendOrder(this.dynamicFormArray);

    let resp = this.cutService.sendOrder(this.dynamicFormArray);

    resp.subscribe(returnData => {
      if(returnData === true)
      {
        console.log(returnData);
        console.log("Order Sended ok..");
        this.cutService.getResultsAsync();
        this.cutterComp.getResultsAsync();
      }
      else
      {
        console.log(returnData);
        this.cutService.getResultsAsync();
        this.cutterComp.getResultsAsync();
      }
    });

    console.log(this.dynamicFormArray);
  }

  public change(item:any) 
  {
    console.log("o chuju złoty!: " + item);
    this.dynamicFormArray=item;
  }

  public removeRowStock(index:any)
  {
    console.log("remove index: " + index);
    console.log(this.dynamicFormArray.stockList.splice(index,1));
  }
  public removeRowCuts(index:any)
  {
    console.log("remove index: " + index);
    console.log(this.dynamicFormArray.cutList.splice(index,1));
    console.log(this.dynamicFormArray.cutList);
  }
  public addRowStock()
  {
    console.log(this.dynamicFormArray.stockList.push({}));
  }
  public addRowCuts(cuts:Cuts)
  {
    this.dynamicFormArray.cutList.push({cutLength:0,cutPcs:0});
    console.log(this.dynamicFormArray.cutList);
    this.dynamicFormArray=cuts;
    this.ngOnInit();
  }

}
