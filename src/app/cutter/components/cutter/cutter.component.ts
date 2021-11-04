import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetuserdataComponent } from '../../../oprawa/components/getuserdata/getuserdata.component';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { ProjectModel } from '../../models/projectmodel';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterServiceService } from '../../services/cutter-service.service';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(public cutService:CutterServiceService, public loginService:LoginserviceService, private getudata:GetuserdataComponent ) {
    this.activeProjectModel.cutList=[{cutLength:225,cutPcs:5}];
    this.activeProjectModel.stockList=[{idFront:0, stockLength:1000, stockPcs:10, stockPrice:0}];
    this.activeProjectModel.cutOptions={ id:0, optionStackResult:false, optionSzrank:0, optionPrice:false, optionAlgo:false, optionIterations:500, optionVariantsQ:true }
    this.activeProjectModel.projectName="Default";
    this.activeProjectModel.projectCreated = new Date();
  }

  results$    : Observable<ResultBarsModule>;
  results     : ResultBarsModule;
  filtered    : ResultBarsModule;     // stackSameBars
  stackedBars   = <ResultBarsModule>{}; // stack2
  stackedRemain = <ResultBarsModule>{}; // stack3
  unstackedBars   = <ResultBarsModule>{}; // stack2
  unstackedRemain = <ResultBarsModule>{}; // stack3
  activeProjectModel  = <ProjectModel>{};
  
  ngOnInit(): void 
  {
    this.prepareData();
    
    this.results = JSON.parse(localStorage.getItem('results')!);
    if(this.results != null)
    {
      this.unStackResults();
      this.stackRemain();
    }
  }

  public getResultsAsync() 
  {    
    this.results$ = this.cutService.getResultsAsync();
  }
  public getResults() 
  {    
    let res = this.cutService.getResults().subscribe(
      data => {
        this.results = data;
        this.unStackResults();
        localStorage.setItem('results',JSON.stringify(data));
      }
    );
  }

  /** NOT USED!
   * ZOSTAWIONE BO WYMECZONE..
   */
  public stackSameBars()
  {
    this.filtered = this.results;
    this.filtered.resultBars?.forEach(e=>e.stackCount=0);

    this.filtered.resultBars! = this.filtered.resultBars!.filter((value,index) => {
      //value.stackCount=0;
      const _thing = JSON.stringify(value);

      return index === this.results.resultBars!.findIndex( obj => {
        return JSON.stringify(obj) === _thing; 
        
      })
    })
    console.log(this.filtered);
  }

  public stackRemain()
  {
    this.stackedRemain = JSON.parse(JSON.stringify(this.results));

    for(let i=0; i<this.stackedRemain.resultRemainingPieces!.length; i++)
    {
      let duplindex:number[]=[];

      for(let j=0; j<this.stackedRemain.resultRemainingPieces!.length; j++)
      {
        if(JSON.stringify(this.stackedRemain.resultRemainingPieces![i].resultBarPieces ) === JSON.stringify(this.stackedRemain.resultRemainingPieces![j].resultBarPieces))
        {
          duplindex.push(j);
        }
      }

      // zapisujemy ilosc duplikatow do elem. o najmniejszym indeksie
      this.stackedRemain.resultRemainingPieces![i].stackCount = duplindex.length;

      // usuwamy pozostale duplikaty zgodnie z tablica duplindex
      // wartosc poczatkowa to 1 bo pierwszy index jest indexem do ktorego zapisywalismy ilosc duplikatow
      // iterujemy od konca bo po splice pozostale indexy sie przesuwaja do gory
      for(let x=duplindex.length-1; x>0; x--)
      {
        this.stackedRemain.resultRemainingPieces!.splice(duplindex[x],1)
      }
      // zerujemy tablice po skonczonej robocie..
      duplindex.length=0;
    }
  }

  public unStackResults(){
    this.stackedBars = JSON.parse(JSON.stringify(this.results));
    for(let i=0; i < this.results.resultBars!.length; ++i)
    {
      if(this.results.resultBars![i].stackCount > 1)
      {
        for(let j=1; j < this.results.resultBars![i].stackCount; ++j)
        {
          this.stackedBars.resultBars?.splice(i, 0, this.stackedBars.resultBars![i]);
        }
      }
    }
  }

  public isRemainBarsPresent(obj:any)
  {
    return (obj && (Object.keys(obj).length != 0));
  }

  public prepareData()
  {
    if(this.loginService.isLogged() === true)
    {
      this.loginService.getUserDataAsync().subscribe( data => { 
        this.activeProjectModel = data.activeProjectModel!;
        this.loginService.loggedUser = data;
        localStorage.setItem('currentUser', JSON.stringify(data));
      });
    }
    else
    {
      // jesli niezalogowany pobieramy z localstorage
      let localOfflineUser  = JSON.parse( localStorage.getItem('offlineUserOrder') ! );

      if(localOfflineUser != null)
      {
        console.log("LocalOfflineUser exists:");
        this.activeProjectModel   = localOfflineUser;
      }
      else // default
      {
        console.log("LocalOfflineUser null:");
        localStorage.setItem('offlineUserOrder', JSON.stringify(this.activeProjectModel));
      }
      
      this.loginService.loggedUser.activeProjectModel  = this.activeProjectModel;
    }
  }
}