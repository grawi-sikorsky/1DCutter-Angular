import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { Cuts } from '../../models/cuts';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  dynamicCutForm = <Cuts>{};
  cuts$       : Observable<Cuts>;  

  constructor(private http: HttpClient, private cutService:CutterServiceService, private cutterComp:CutterComponent, private loginService:LoginserviceService) 
  { 
    this.dynamicCutForm.cutList=[];
    this.dynamicCutForm.stockList=[];
  }

  ngOnInit(): void 
  { 
    //this.getCutsAsync();

    if(this.loginService.isLogged() === true)
    {
      // jesli zalogowany pobieramy z api
      this.cutService.getCutsAsync().subscribe( data => {
        this.dynamicCutForm = data;
        console.log(this.dynamicCutForm);
      })
    }
    else
    {
      // jesli niezalogowany pobieramy z localstorage
      let localCuts = JSON.parse( localStorage.getItem('localCuts') ! );
      var localStock = JSON.parse( localStorage.getItem('localStock') ! );
      if(localCuts != null && localStock != null)
      {
        console.log("not null");
        this.dynamicCutForm.cutList = localCuts;
        this.dynamicCutForm.stockList = localStock;
      }
      else // default
      {
        console.log("local cuts null");
        this.dynamicCutForm.cutList.push({cutLength:225,cutPcs:5});
        this.dynamicCutForm.stockList.push({stockLength:1000,stockPcs:10});
        localStorage.setItem('localCuts',JSON.stringify(this.dynamicCutForm.cutList));
        localStorage.setItem('localStock',JSON.stringify(this.dynamicCutForm.stockList));

      }
    }
  }

  public getCutsAsync() 
  {    
    console.log("CutterComponent: CUTS Async PAJP");
    this.cuts$ = this.cutService.getCutsAsync();
  }

  /** Wysyla zapytanie do api */
  public submitOrder()
  {
    console.log("Submitting order...");

    let resp = this.cutService.sendOrder(this.dynamicCutForm);

    resp.subscribe(returnData => {
        console.log("Order Sended ok..");
        this.cutterComp.getResultsAsync();
        this.getCutsAsync();
    });

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('localCuts',JSON.stringify(this.dynamicCutForm.cutList));
      localStorage.setItem('localStock',JSON.stringify(this.dynamicCutForm.stockList));
    }
    else
    {
      /* Gdy bedzie zalogowany? Z database? */
    }
  }

  public change(item:any) 
  {
    console.log("o chuju złoty!: " + item);
    this.dynamicCutForm=item;
  }

  public removeRowStock(index:any)
  {
    this.dynamicCutForm.stockList.splice(index,1);
  }
  public removeRowCuts(index:any)
  {
    this.dynamicCutForm.cutList.splice(index,1);
  }
  public addRowStock()
  {
    if(this.loginService.isLogged() || this.dynamicCutForm.stockList.length < 2)
    {
      this.dynamicCutForm.stockList.push({stockLength:1000,stockPcs:10});
    }
    else
    {
      console.log("Niezalogowany, max 2!");
    }
  }
  public addRowCuts()
  {
    if(this.loginService.isLogged() || this.dynamicCutForm.cutList.length < 5)
    {
      this.dynamicCutForm.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.log("Niezalogowany, max 5!");
    }
  }

}
