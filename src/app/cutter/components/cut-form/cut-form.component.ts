import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { UserService } from '../../../oprawa/services/user.service';
import { CutterServiceService } from '../../services/cutter-service.service';
import { ResultService } from '../../services/result.service';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-form',
  templateUrl: './cut-form.component.html',
  styleUrls: ['./cut-form.component.css']
})
export class CutFormComponent implements OnInit {

  subject = new Subject();
  tempuser:User={};

  constructor(public cutService:CutterServiceService, public loginService:LoginserviceService, public dialog:MatDialog, private resultsService:ResultService, public userService:UserService, private cutterComp:CutterComponent) 
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
    console.warn("Submitting order: ");
    console.warn(this.userService.loggedUser.activeProjectModel);
    this.resultsService.isWorking = true;
    
    this.cutService.sendOrder(this.userService.loggedUser.activeProjectModel!).subscribe(
      returnData => {
        this.resultsService.results = returnData;
        localStorage.setItem('results', JSON.stringify(returnData));
        this.userService.loggedUser.activeProjectModel!.projectResults = JSON.stringify(returnData);

        this.resultsService.prepareResults();
        this.resultsService.isWorking = false;

        console.log("Order Sended ok.. return data: ");
        console.log(returnData);
    });

    if(!this.userService.isLogged())
    {
      localStorage.setItem('offlineUserOrder', JSON.stringify(this.userService.loggedUser.activeProjectModel));
    }
    else
    {
      /* Gdy bedzie zalogowany? */
      //Zapisujem do local current user
      this.userService.loggedUser.activeProjectModel = this.userService.loggedUser.activeProjectModel;
      localStorage.setItem('currentUser', JSON.stringify(this.userService.loggedUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(3000) )
    .subscribe(
      () => {
        this.loginService.modifyProject(this.userService.loggedUser.activeProjectModel!, this.userService.loggedUser.activeProjectModel!.id)
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
    let resztki = this.userService.loggedUser.activeProjectModel!.stockList.splice(index);

    // splice zwraca tablice usunietych elementow, wiec kazdy element poza pierwszym (usuwanym) pakujemy z powrotem do tablicy
    resztki.shift(); // usuwa 1 element z tablicy resztek
    resztki.forEach(element => {
      element.idFront = element.idFront!-1;
      this.userService.loggedUser.activeProjectModel!.stockList.splice(index, 0, element)
      index++;
    });

    this.subject.next();
    console.log( this.userService.loggedUser.activeProjectModel!.stockList );
  }
  public removeRowCuts(index:any)
  {
    this.userService.loggedUser.activeProjectModel!.cutList.splice(index,1);
    this.subject.next();
  }
  public addRowStock()
  {
    if(this.canAddStock())
    {
      let index = this.userService.loggedUser.activeProjectModel!.stockList.length+1;
      this.userService.loggedUser.activeProjectModel!.stockList.push({idFront:index, stockLength:1000, stockPcs:10, stockPrice:0});
    }
    else
    {
      console.warn("Niezalogowany, max 1!");
    }
    this.subject.next();
  }
  public addRowCuts()
  {
    if(this.canAddCut())
    {
      this.userService.loggedUser.activeProjectModel!.cutList.push({cutLength:100,cutPcs:1});
    }
    else
    {
      console.warn("Niezalogowany, max 5!");
    }
    this.subject.next();
  }
  public canAddStock()
  {
    if(this.userService.isLogged() || this.userService.loggedUser.activeProjectModel!.stockList.length < 1) { return true; }
    else return false;
  }
  public canAddCut()
  {
    if(this.userService.isLogged() || this.userService.loggedUser.activeProjectModel!.cutList.length < 4) { return true; }
    else return false;
  }
}