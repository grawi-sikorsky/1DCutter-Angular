import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterServiceService } from '../../services/cutter-service.service';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {}

  results$    : Observable<ResultBarsModule>;
  results     : ResultBarsModule;
  filtered    : ResultBarsModule;


  ngOnInit(): void 
  { 
    this.getResultsAsync();
    this.getResults();
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
        this.stackSameBars();
      }
    );
  }

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

}