import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
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
  cuts$         : Observable<Cuts>;
  currentUser   : User={};

  constructor(private http: HttpClient, private cutService:CutterServiceService, private cutterComp:CutterComponent, private loginService:LoginserviceService) 
  { 
    this.dynamicCutForm.cutList=[];
    this.dynamicCutForm.stockList=[];
  }

  ngOnInit(): void 
  { 
    if(this.loginService.isLogged() === true)
    {
      // jesli zalogowany pobieramy z api
      // this.cutService.getCutsAsync().subscribe( data => {
      //   this.dynamicCutForm = data;
      //   console.log(this.dynamicCutForm);
      // })

      this.currentUser = JSON.parse( localStorage.getItem('currentUser') ! );
      this.dynamicCutForm.cutList = this.currentUser.cutList!;
      this.dynamicCutForm.stockList = this.currentUser.stockList!;
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

  /** NOT USED */
  public getCutsAsync() 
  {    
    console.log("CutForm: CUTS Async PAJP");
    this.cuts$ = this.cutService.getCutsAsync();
  }

  /** 
   * SUBMIT:
   *  1. Wysyla zapytanie do api<p>
   *  2. Pobiera Wyniki Async cutterComp.getResultsAsync();
   *  3. Zwraca CUTLIST
   *************************/
  public submitOrder()
  {
    console.log("Submitting order...");

    let resp = this.cutService.sendOrder(this.dynamicCutForm, this.currentUser.username!, this.currentUser.password!);

    resp.subscribe(returnData => {
        this.cutterComp.getResultsAsync();
        this.dynamicCutForm = returnData;

        console.log("Order Sended ok..");
        console.log(returnData);
    });

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('localCuts',JSON.stringify(this.dynamicCutForm.cutList));
      localStorage.setItem('localStock',JSON.stringify(this.dynamicCutForm.stockList));
    }
    else
    {
      /* Gdy bedzie zalogowany? Z database? */
      //Zapisujem do local current user
      this.currentUser.cutList = this.dynamicCutForm.cutList;
      this.currentUser.stockList = this.dynamicCutForm.stockList;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
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
