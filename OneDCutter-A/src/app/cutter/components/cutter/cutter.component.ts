import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CutterServiceService } from '../../services/cutter-service.service';
import { FirstFit } from '../../models/first-fit';
import { ResultBarsModule, ResultBar } from '../../models/result-bars/result-bars.module';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {     
  }

  listStock?:FirstFit[];
  orderity:any;
  results$ : Observable<ResultBarsModule>;    

  ngOnInit(): void 
  { 
    this.getResultsAsync();

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


  }

  public getResultsAsync() 
  {    
    console.log("Async PAJP");
    this.results$ = this.cutService.getResultsAsync();
    console.log(this.results$);
  }

  public addItem(): void {
    this.groups.push({name: 'foo', items: 'bar});
   }

}