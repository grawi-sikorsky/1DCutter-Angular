import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/oprawa/models/user';
import { LoadDialogComponent } from '../../../oprawa/components/load-dialog/load-dialog.component';
import { SaveDialogComponent } from '../../../oprawa/components/save-dialog/save-dialog.component';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  subject = new Subject();
  tempuser:User={};
  isWorking:boolean=false;

  constructor(public cutService:CutterServiceService, public cutterComp:CutterComponent, public loginService:LoginserviceService, public dialog:MatDialog, private resultsComp:ResultsComponent) 
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
    console.warn("Submitting order...");
    console.warn(this.cutterComp.activeProjectModel);

    this.isWorking = true;
    let resp                  = this.cutService.sendOrder(this.cutterComp.activeProjectModel);

    resp.subscribe(returnData => {
        this.resultsComp.results = returnData;
        this.cutterComp.results = returnData;
        localStorage.setItem('results', JSON.stringify(returnData));
        this.resultsComp.unStackResults();
        this.resultsComp.stackRemain();
        
        this.isWorking = false;
        console.log("Order Sended ok.. return data: ");
        console.log(returnData);
    });

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('offlineUserOrder', JSON.stringify(this.cutterComp.activeProjectModel));
    }
    else
    {
      /* Gdy bedzie zalogowany? */
      //Zapisujem do local current user
      this.loginService.loggedUser.activeProjectModel = this.cutterComp.activeProjectModel;
      localStorage.setItem('currentUser', JSON.stringify(this.loginService.loggedUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(3000) )
    .subscribe(
      () => {
        this.loginService.modifyProject(this.cutterComp.activeProjectModel, this.cutterComp.activeProjectModel.id)
        .subscribe(
          data => {
            console.log("Data returned from modifyProject:");
            console.log(data);
          }
        );
      }
    );
  }


  public removeRowStock(index:any)
  {
    // usuwamy reszte tablicy od indexu
    let resztki = this.cutterComp.activeProjectModel.stockList.splice(index);

    // splice zwraca tablice usunietych elementow, wiec kazdy element poza pierwszym (usuwanym) pakujemy z powrotem do tablicy
    resztki.shift(); // usuwa 1 element z tablicy resztek
    resztki.forEach(element => {
      element.idFront = element.idFront!-1;
      this.cutterComp.activeProjectModel.stockList.splice(index, 0, element)
      index++;
    });

    this.subject.next();
    console.log( this.cutterComp.activeProjectModel.stockList );
  }
  public removeRowCuts(index:any)
  {
    this.cutterComp.activeProjectModel.cutList.splice(index,1);
    this.subject.next();
  }
  public addRowStock()
  {
    if(this.canAddStock())
    {
      let index = this.cutterComp.activeProjectModel.stockList.length+1;
      this.cutterComp.activeProjectModel.stockList.push({idFront:index, stockLength:1000, stockPcs:10, stockPrice:0});
    }
    else
    {
      console.log("Niezalogowany, max 1!");
    }
    this.subject.next();
  }
  public addRowCuts()
  {
    if(this.canAddCut()) //this.loginService.isLogged() || this.cutterComp.activeProjectModel.cutList.length < 4)
    {
      this.cutterComp.activeProjectModel.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.log("Niezalogowany, max 5!");
    }
    this.subject.next();
  }
  public canAddStock()
  {
    if(this.loginService.isLogged() || this.cutterComp.activeProjectModel.stockList.length < 1) { return true; }
    else return false;
  }
  public canAddCut()
  {
    if(this.loginService.isLogged() || this.cutterComp.activeProjectModel.cutList.length < 4) { return true; }
    else return false;
  }
  public deleteLocalStorage()
  {
    console.log("clear LS");
    localStorage.clear();
  }


  public loadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {width:"600px", data: this.loginService.loggedUser.activeProjectId});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("LOAD dialog zamkniety");
      this.loginService.loggedUser.activeProjectId = data;

      this.cutterComp.prepareData();
    })
  }
  public saveDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {width:"600px",  data: {savedProjects: this.loginService.loggedUser.savedProjectModels, activeOrder: this.cutterComp.activeProjectModel}});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("SAVE dialog zamkniety");
      
      //this.loginService.loggedUser.savedProjectModels = data;

      this.cutterComp.prepareData();
    })

  }
  public isLoadingResults(){
    if( this.isWorking ){
      return true;
    }
    else return false;
  }

}