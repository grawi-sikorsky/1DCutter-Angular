import { Injectable } from '@angular/core';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';
import { Observable } from 'rxjs';
import { CutterServiceService } from './cutter-service.service';
import { UserService } from '../../oprawa/services/user.service';
import { LoginserviceService } from '../../oprawa/services/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  results       = <ResultBarsModule>{};
  isWorking     : boolean = false;
  noResults     : boolean = false;
  stackedBars   = <ResultBarsModule>{};
  stackedRemain = <ResultBarsModule>{};

  constructor(private cutService:CutterServiceService, private userService:UserService, private loginService:LoginserviceService) { }

  public prepareResults(){
    this.noResults = false;
    if(this.userService.loggedUser.activeProjectModel!.projectResults !== null){
      this.results = JSON.parse(this.userService.loggedUser.activeProjectModel!.projectResults);
      this.loginService.modifyProject(this.userService.loggedUser.activeProjectModel!, this.userService.loggedUser.activeProjectId).subscribe(
        returnProject=>{
          this.userService.loggedUser.activeProjectModel = returnProject;
          console.log("return from modify project: (preprare results)");
          console.log(returnProject);
        }
      );
      //this.cutService.sendOrder(this.userService.loggedUser.activeProjectModel!);
    }
    // else if(localStorage.getItem('results') !== null){
    //   this.results = JSON.parse(localStorage.getItem('results')!);
    // }
    else{
      this.noResults = true;
    }
    
    this.stackRemain();
    this.unStackResults();
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
}