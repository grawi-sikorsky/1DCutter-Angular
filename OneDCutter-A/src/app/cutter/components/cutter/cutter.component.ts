import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cuts, StockList } from '../../models/cuts';
import { FirstFit } from '../../models/first-fit';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterServiceService } from '../../services/cutter-service.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {     
  }

  listStock?  : FirstFit[];
  orderList   : Cuts;
  results$    : Observable<ResultBarsModule>;
  cuts$       : Observable<Cuts>;  

  cutform     : FormGroup;

  ngOnInit(): void 
  { 
    this.getResultsAsync();
    this.getCutsAsync();

    this.cutform = new FormGroup({
      cutpcs  : new FormControl(""),
      cutlen  : new FormControl(""),
      stopcs  : new FormControl(""),
      stolen  : new FormControl("")
    })

    
    

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
    console.log("RESULTS Async PAJP");
    this.results$ = this.cutService.getResultsAsync();
  }

  public getCutsAsync() 
  {    
    console.log("CUTS Async PAJP");
    this.cuts$ = this.cutService.getCutsAsync();
  }

  public addItem(): void {
    //this.groups.push({name: 'foo', items: 'bar});
  }

  public convertToOrder()
  {

    //this.orderList = this.cuts$.pipe( map( e => e.cutList));
    this.cuts$
      .pipe(
        map(e=> {
          return e
        }))
      .subscribe( e => {
        this.orderList = e;
        console.log("order"+this.orderList);
        console.log("e:"+e);
      });

      console.log(this.orderList);
  }

  public submitOrder()
  {
    console.log("Submitting order...");
    this.convertToOrder();

    this.cutService.sendOrder(this.orderList);

    let resp = this.cutService.sendOrder(this.orderList);

    resp.subscribe(returnData => {
      if(returnData === true)
      {
        //console.log(returnData);
        console.log("Order Sended ok..");
      }
      else
      {
        //console.log(returnData);
        console.log("Order się zesrał..")
      }
    });
  }

  public change(item:any) 
  {
    console.log("o chuju złoty!: " + item);
  }

}