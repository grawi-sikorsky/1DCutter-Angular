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
        console.log(data);
        this.compare();

      }
    );
  }

  public compare()
  {
    let nowaLista = Array.from(this.results.resultBars!.reduce((map, obj) => map.set( obj.resultBarPieces, obj), new Map() ) .values() );

    console.log(nowaLista);
    //let newFormulalist =  formulalist.filter((v,i) => formulalist.findIndex(item => item.value == v.value) === i);

    //let nowaLista =  this.results.resultBars.filter((v,i) => this.results.resultBars.findIndex(item => item.resultBarPieces == v.resultBarPieces) === i);


  }

}