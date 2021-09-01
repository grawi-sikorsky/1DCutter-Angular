import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CutOptions } from '../../models/cutoptions';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterServiceService } from '../../services/cutter-service.service';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(public cutService:CutterServiceService) {}

  results$    : Observable<ResultBarsModule>;
  results     : ResultBarsModule;
  filtered    : ResultBarsModule;     // stackSameBars
  stackedBars   = <ResultBarsModule>{}; // stack2
  stackedRemain = <ResultBarsModule>{}; // stack3
  cutopt        = <CutOptions>{};

  ngOnInit(): void 
  { 
    //this.getResultsAsync();
    this.getResults();
    this.cutopt=this.cutService.cutOptions;
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
        this.stackResults();
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


  public stackResults()
  {
    this.stackedBars = JSON.parse(JSON.stringify(this.results));
    console.log(this.stackedBars);

    for(let i=0; i<this.stackedBars.resultBars!.length; i++)
    {
      let duplindex:number[]=[];

      for(let j=0; j<this.stackedBars.resultBars!.length; j++)
      {
        if(JSON.stringify(this.stackedBars.resultBars![i].resultBarPieces ) === JSON.stringify(this.stackedBars.resultBars![j].resultBarPieces))
        {
          duplindex.push(j);
        }
      }

      // zapisujemy ilosc duplikatow do elem. o najmniejszym indeksie
      this.stackedBars.resultBars![i].stackCount = duplindex.length;

      // usuwamy pozostale duplikaty zgodnie z tablica duplindex
      // wartosc poczatkowa to 1 bo pierwszy index jest indexem do ktorego zapisywalismy ilosc duplikatow
      // iterujemy od konca bo po splice pozostale indexy sie przesuwaja do gory
      for(let x=duplindex.length-1; x>0; x--)
      {
        this.stackedBars.resultBars!.splice(duplindex[x],1)
      }
      // zerujemy tablice po skonczonej robocie..
      duplindex.length=0;
    }

    this.stackRemain();
  }

  public stackRemain()
  {
    this.stackedRemain = JSON.parse(JSON.stringify(this.results));
    console.log(this.stackedRemain);

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

  public isRemainBarsPresent(obj:any)
  {
    return (obj && (Object.keys(obj).length != 0));
  }
}