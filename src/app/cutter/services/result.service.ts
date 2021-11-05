import { Injectable } from '@angular/core';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';
import { Observable } from 'rxjs';
import { CutterServiceService } from './cutter-service.service';
import { UserService } from '../../oprawa/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  results       = <ResultBarsModule>{};
  results$      : Observable<ResultBarsModule>;
  isWorking     : boolean = false;
  stackedBars   = <ResultBarsModule>{}; // stack2
  stackedRemain = <ResultBarsModule>{}; // stack3

  constructor(private cutService:CutterServiceService, private userService:UserService) { }

  public getResults(){
    this.isWorking = true;
    this.cutService.sendOrder(this.userService.loggedUser.activeProjectModel!).subscribe(response=>{
      this.results = response;
      this.isWorking = false;
      this.stackRemain();
      this.unStackResults();

      localStorage.setItem("results", JSON.stringify(response));
      console.log(this.results);
    });
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