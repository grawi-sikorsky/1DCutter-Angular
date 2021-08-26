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



  ngOnInit(): void 
  { 
    this.getResultsAsync();
  }

  public getResultsAsync() 
  {    
    console.log("CutterComponent: RESULTS Async PAJP");
    this.results$ = this.cutService.getResultsAsync();
  }

}