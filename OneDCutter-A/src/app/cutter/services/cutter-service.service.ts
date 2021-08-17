import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  listStock?:string[];

  constructor(private http:HttpClient) { }


  public getCutResult()
  {
    return this.http.get<string[]>("http://localhost:8080/1dcut", {responseType: 'json'} );
  }

}
