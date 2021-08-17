import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirstFit } from '../models/first-fit';

@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  listStock?:FirstFit[];

  constructor(private http:HttpClient) { }


  public getCutResult()
  {
    return this.http.get<FirstFit[]>("http://localhost:8080/1dcut" );
  }

}
