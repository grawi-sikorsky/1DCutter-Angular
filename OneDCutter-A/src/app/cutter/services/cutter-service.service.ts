import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstFit } from '../models/first-fit';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';

@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  listStock?:FirstFit[];
  ordero:any;
  resultBars:ResultBarsModule;

  constructor(private http:HttpClient) { }

  public sendOrder( /* przydalby sie typ */ )
  {
    return this.http.post<any>("http://localhost:8080/1dcut", this.ordero);
  }

  public getCutResult()
  {
    return this.http.get<FirstFit[]>("http://localhost:8080/1dcut" );
  }

  public getResultBars()
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/cut" );
  }

}
