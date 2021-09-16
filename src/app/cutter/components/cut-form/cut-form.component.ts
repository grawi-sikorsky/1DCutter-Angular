import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { OrderModel, StockList } from '../../models/ordermodel';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  //orderModelC = <OrderModel>{};

  constructor(private http: HttpClient, public cutService:CutterServiceService, public cutterComp:CutterComponent, public loginService:LoginserviceService) 
  { 
    // this.orderModelC.cutList=[];
    // this.orderModelC.stockList=[];
  }

  ngOnInit(): void 
  {
    //this.loginService.$userStream.subscribe( data => { this.orderModelC = data.orderModel!; } );
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
    console.log(this.cutterComp.orderModel);

    let resp = this.cutService.sendOrder(this.cutterComp.orderModel);

    resp.subscribe(returnData => {
        this.cutterComp.getResults();
        this.cutterComp.orderModel = returnData;

        console.log("Order Sended ok.. return data: ");
        console.log(returnData);
    });

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('localCuts',JSON.stringify(this.cutterComp.orderModel.cutList));
      localStorage.setItem('localStock',JSON.stringify(this.cutterComp.orderModel.stockList));
      localStorage.setItem('localOptions', JSON.stringify(this.cutterComp.orderModel.cutOptions));
    }
    else
    {
      /* Gdy bedzie zalogowany? */
      //Zapisujem do local current user
      this.loginService.loggedUser.orderModel = this.cutterComp.orderModel;
      localStorage.setItem('currentUser', JSON.stringify(this.loginService.loggedUser));
    }
  }

  public removeRowStock(index:any)
  {
    // usuwamy reszte tablicy od indexu
    let resztki = this.cutterComp.orderModel.stockList.splice(index);

    // splice zwraca tablice usunietych elementow, wiec kazdy element poza pierwszym (usuwanym) pakujemy z powrotem do tablicy
    resztki.shift(); // usuwa 1 element z tablicy resztek
    resztki.forEach(element => {
      element.idFront = element.idFront!-1;
      this.cutterComp.orderModel.stockList.splice(index, 0, element)
      index++;
    });
    
    console.log( this.cutterComp.orderModel.stockList );
  }
  public removeRowCuts(index:any)
  {
    this.cutterComp.orderModel.cutList.splice(index,1);
  }
  public addRowStock()
  {
    if(this.canAddStock())
    {
      let index = this.cutterComp.orderModel.stockList.length+1;
      this.cutterComp.orderModel.stockList.push({idFront:index, stockLength:1000, stockPcs:10, stockPrice:0});
    }
    else
    {
      console.log("Niezalogowany, max 1!");
    }
  }
  public addRowCuts()
  {
    if(this.canAddCut()) //this.loginService.isLogged() || this.cutterComp.orderModel.cutList.length < 4)
    {
      this.cutterComp.orderModel.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.log("Niezalogowany, max 5!");
    }
  }
  public canAddStock()
  {
    if(this.loginService.isLogged() || this.cutterComp.orderModel.stockList.length < 1) { return true; }
    else return false;
  }
  public canAddCut()
  {
    if(this.loginService.isLogged() || this.cutterComp.orderModel.cutList.length < 4) { return true; }
    else return false;
  }
  public deleteLocalStorage()
  {
    console.log("clear LS");
    localStorage.clear();
  }
}
