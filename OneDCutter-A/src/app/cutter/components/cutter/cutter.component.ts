import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CutterServiceService } from '../../services/cutter-service.service';
import { FirstFit } from '../../models/first-fit';
import { ResultBarsModule, ResultBar } from '../../models/result-bars/result-bars.module';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {  }

  listStock?:FirstFit[];
  orderity:any;
  resultBars:ResultBarsModule[];
  resultBar:ResultBar[];

  ngOnInit(): void 
  { 
    // let respo = this.cutService.getCutResult();
    // respo.subscribe(
    //   returnData => {
    //     console.log("return data: " + JSON.stringify(returnData));
    //     this.listStock = returnData;
    //     console.log("listStock:" + JSON.stringify( this.listStock ));
    // });

    // let respo2 = this.cutService.sendOrder();
    // respo2.subscribe(
    //   returnData2 => {
    //     console.log("return data2: " + JSON.stringify(returnData2));
    //     this.orderity = returnData2;
    //     console.log("listStock:" + JSON.stringify( this.orderity ));
    // });

    let respo3 = this.cutService.getResultBars();
    
    respo3.subscribe(
      riturndata => {
        console.log("return data3: " + JSON.stringify(riturndata));
        this.resultBars = riturndata;
        console.log("resultBars:" + JSON.stringify( this.resultBars ));
    });
  }

  public costam()
  {
    //this.listStock?.entries();
  }



}