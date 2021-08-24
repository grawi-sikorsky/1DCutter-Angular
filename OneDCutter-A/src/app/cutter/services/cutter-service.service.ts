import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstFit } from '../models/first-fit';
import { ResultBar, ResultBarsModule } from '../models/result-bars/result-bars.module';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cuts } from '../models/cuts';


@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  listStock?:FirstFit[];
  //orderooo:Cuts;

  constructor(private http:HttpClient) { }


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

  public getCutsAsync() : Observable<Cuts>
  {
    console.log("GET CUTLIST ");
    return this.http.get<Cuts>("http://localhost:8080/cut")
  }

  public sendOrder(orderooo:Cuts)
  {
    console.log("POST CUTLIST ");
    return this.http.post("http://localhost:8080/cut", orderooo);
  }


}
