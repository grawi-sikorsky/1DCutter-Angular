import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnChanges {

  constructor(public cutterComp: CutterComponent) { }

  @Input() inputResults:ResultBarsModule;

  results: ResultBarsModule;
  results$    : Observable<ResultBarsModule>;
  stackedBars   = <ResultBarsModule>{}; // stack2
  stackedRemain = <ResultBarsModule>{}; // stack3

  ngOnChanges(changes: SimpleChanges): void {
    this.results = this.inputResults;
    this.results = JSON.parse(localStorage.getItem('results')!);
    if(this.results != null)
    {
      this.unStackResults();
      this.stackRemain();
    }
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
