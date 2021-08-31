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
  clean       = <ResultBarsModule>{}; // stack2
  cutopt      = <CutOptions>{};

  ngOnInit(): void 
  { 
    this.getResultsAsync();
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
        //this.stackSameBars();
        this.stack2();
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


  public stack2()
  {
    this.clean = JSON.parse(JSON.stringify(this.results)); // TODO kierwa referencja... 
    console.log(this.clean);
    for(let i=0; i<this.results.resultBars!.length; i++)
    {
      debugger
      let duplindex:number[]=[];

      for(let j=0; j<this.clean.resultBars!.length; j++)
      {
        if(JSON.stringify(this.clean.resultBars![j].resultBarPieces ) === JSON.stringify(this.results.resultBars![i].resultBarPieces))
        {
          duplindex.push(j);
        }
      }

      // zapisujemy ilosc duplikatow do elem. o najmniejszym indeksie
      this.clean.resultBars![i].stackCount = duplindex.length;

      // usuwamy pozostale duplikaty zgodnie z tablica duplindex
      // wartosc poczatkowa to 1 bo pierwszy index jest indexem do ktorego zapisywalismy ilosc duplikatow
      // iterujemy od konca bo po splice pozostale indexy sie przesuwaja do gory
      for(let x=duplindex.length-1; x>0; x--)
      {
        this.clean.resultBars!.splice(duplindex[x],1)
      }
      // zerujemy tablice po skonczonej robocie..
      duplindex.length=0;
    }
  }
}