import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstFit } from '../models/first-fit';
import { ResultBar, ResultBarsModule } from '../models/result-bars/result-bars.module';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  listStock?:FirstFit[];
  ordero:any;

  constructor(private http:HttpClient) { }

  public sendOrder( /* przydalby sie typ */ )
  {
    return this.http.post<any>("http://localhost:8080/1dcut", this.ordero);
  }

  public getCutResult()
  {
    return this.http.get<FirstFit[]>("http://localhost:8080/1dcut" );
  }

  public getResultBars()// : Observable<ResultBar[]>
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/cut");
    // .pipe(
    //   map((attributes: ResultBarsModule[]) => {
    //       return attributes.map((attribute) => {
    //           attribute.pieces = attribute.pieces
    //               .map((option: ResultBar) => {
    //                   return option;
    //           });
    //           return attribute;
    //       });
    //   })
    // );

  }

  public getResults()
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/result")
  }
  public getResultsAsync() : Observable<ResultBarsModule>
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/result")
  }

}
