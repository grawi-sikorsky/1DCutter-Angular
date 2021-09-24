import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { OrderModel, StockList } from '../../models/ordermodel';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SaveDialogComponent } from '../../../oprawa/components/save-dialog/save-dialog.component';
import { LoadDialogComponent } from '../../../oprawa/components/load-dialog/load-dialog.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  subject = new Subject();
  tempuser:User={};

  constructor(private http: HttpClient, public cutService:CutterServiceService, public cutterComp:CutterComponent, public loginService:LoginserviceService, public dialog:MatDialog) 
  { 
    this.submitDebounced();
  }

  ngOnInit(): void 
  {
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
    console.log(this.cutterComp.activeOrderModel);

    let resp = this.cutService.sendOrder(this.cutterComp.activeOrderModel);

    resp.subscribe(returnData => {
        this.cutterComp.getResults();
        this.cutterComp.activeOrderModel = returnData;

        console.log("Order Sended ok.. return data: ");
        console.log(returnData);
    });

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('offlineUserOrder', JSON.stringify(this.cutterComp.activeOrderModel));
    }
    else
    {
      /* Gdy bedzie zalogowany? */
      //Zapisujem do local current user
      this.loginService.loggedUser.activeOrderModel = this.cutterComp.activeOrderModel;
      localStorage.setItem('currentUser', JSON.stringify(this.loginService.loggedUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(3000) )
    .subscribe(
      () => {
        this.cutService.setOrder(this.cutterComp.activeOrderModel)
        .subscribe(
          data => {
            console.log("return data from send ordermodel:")
            console.log(data);
          }
        );
      }
    );
  }


  public removeRowStock(index:any)
  {
    // usuwamy reszte tablicy od indexu
    let resztki = this.cutterComp.activeOrderModel.stockList.splice(index);

    // splice zwraca tablice usunietych elementow, wiec kazdy element poza pierwszym (usuwanym) pakujemy z powrotem do tablicy
    resztki.shift(); // usuwa 1 element z tablicy resztek
    resztki.forEach(element => {
      element.idFront = element.idFront!-1;
      this.cutterComp.activeOrderModel.stockList.splice(index, 0, element)
      index++;
    });

    this.subject.next();
    console.log( this.cutterComp.activeOrderModel.stockList );
  }
  public removeRowCuts(index:any)
  {
    this.cutterComp.activeOrderModel.cutList.splice(index,1);
    this.subject.next();
  }
  public addRowStock()
  {
    if(this.canAddStock())
    {
      let index = this.cutterComp.activeOrderModel.stockList.length+1;
      this.cutterComp.activeOrderModel.stockList.push({idFront:index, stockLength:1000, stockPcs:10, stockPrice:0});
    }
    else
    {
      console.log("Niezalogowany, max 1!");
    }
    this.subject.next();
  }
  public addRowCuts()
  {
    if(this.canAddCut()) //this.loginService.isLogged() || this.cutterComp.activeOrderModel.cutList.length < 4)
    {
      this.cutterComp.activeOrderModel.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.log("Niezalogowany, max 5!");
    }
    this.subject.next();
  }
  public canAddStock()
  {
    if(this.loginService.isLogged() || this.cutterComp.activeOrderModel.stockList.length < 1) { return true; }
    else return false;
  }
  public canAddCut()
  {
    if(this.loginService.isLogged() || this.cutterComp.activeOrderModel.cutList.length < 4) { return true; }
    else return false;
  }
  public deleteLocalStorage()
  {
    console.log("clear LS");
    localStorage.clear();
  }


  public loadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {width:"600px", data: this.loginService.loggedUser.activeOrderId});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("LOAD dialog zamkniety");
      this.loginService.loggedUser.activeOrderId = data;

      this.cutterComp.prepareData();
    })
  }
  public saveDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {width:"600px",  data: {savedOrders: this.loginService.loggedUser.savedOrderModels, activeOrder: this.cutterComp.activeOrderModel}});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("SAVE dialog zamkniety");
      
      //this.loginService.loggedUser.savedOrderModels = data;

      this.cutterComp.prepareData();
    })

  }

}