import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { OrderModel } from '../../models/ordermodel';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  dynamicCutForm = <OrderModel>{};
  cuts$         : Observable<OrderModel>;
  currentUser   : User={};

  constructor(private http: HttpClient, private cutService:CutterServiceService, private cutterComp:CutterComponent, public loginService:LoginserviceService) 
  { 
    this.dynamicCutForm.cutList=[];
    this.dynamicCutForm.stockList=[];
  }

  ngOnInit(): void 
  {
    if(this.loginService.isLogged() === true)
    {
      this.currentUser = JSON.parse( localStorage.getItem('currentUser') ! );
      this.dynamicCutForm.cutList = this.currentUser.orderModel!.cutList!;
      this.dynamicCutForm.stockList = this.currentUser.orderModel!.stockList!;
      this.dynamicCutForm.usernameOrder = this.currentUser.username!;
    }
    else
    {
      // jesli niezalogowany pobieramy z localstorage
      let localCuts = JSON.parse( localStorage.getItem('localCuts') ! );
      let localStock = JSON.parse( localStorage.getItem('localStock') ! );

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

  /** 
   * SUBMIT:
   *  1. Wysyla zapytanie do api<p>
   *  2. Pobiera Wyniki Async cutterComp.getResultsAsync();
   *  3. Zwraca CUTLIST
   *************************/
  public submitOrder()
  {
    console.log("Submitting order...");
    console.log(this.dynamicCutForm);

    let resp = this.cutService.sendOrder(this.dynamicCutForm, this.currentUser.username!);

    resp.subscribe(returnData => {
        this.cutterComp.getResultsAsync();  // not used?
        this.cutterComp.getResults();
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
      this.currentUser.orderModel!.cutList = this.dynamicCutForm.cutList;
      this.currentUser.orderModel!.stockList = this.dynamicCutForm.stockList;
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
    if(this.canAddStock())
    {
      this.dynamicCutForm.stockList.push({stockLength:1000,stockPcs:10});
    }
    else
    {
      console.log("Niezalogowany, max 1!");
    }
  }
  public addRowCuts()
  {
    if(this.canAddCut()) //this.loginService.isLogged() || this.dynamicCutForm.cutList.length < 4)
    {
      this.dynamicCutForm.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.log("Niezalogowany, max 5!");
    }
  }
  public canAddStock()
  {
    if(this.loginService.isLogged() || this.dynamicCutForm.stockList.length < 1) { return true; }
    else return false;
  }
  public canAddCut()
  {
    if(this.loginService.isLogged() || this.dynamicCutForm.cutList.length < 4) { return true; }
    else return false;
  }
  public deleteLocalStorage()
  {
    console.log("clear LS");
    localStorage.clear();
  }
}
