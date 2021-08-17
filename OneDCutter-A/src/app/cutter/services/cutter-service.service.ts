import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstFit } from '../models/first-fit';

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

}
