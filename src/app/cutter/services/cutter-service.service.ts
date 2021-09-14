import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../oprawa/services/loginservice.service';
import { CutOptions } from '../models/cutoptions';
import { OrderModel } from '../models/ordermodel';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';



@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  constructor(private http:HttpClient, private loginService:LoginserviceService) { }
  // DATA
  cu:User={};
  cutOptions = <CutOptions>{};


  public getResultsAsync() : Observable<ResultBarsModule>
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/result");
  }
  public getResults()
  {
    return this.http.get<ResultBarsModule>("http://localhost:8080/result");
  }

  // TODO Ogarnac JWT !!!
  public sendOrder(orderList:OrderModel, username:string)
  {
    //test
    orderList.cutOptions = this.cutOptions;
    console.log("headers from LS: " + this.loginService.header);
    console.log("CutterService: POST ORDER ");
    
    this.cu = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cu.username);
    console.log(this.cu.password);

    const h = new HttpHeaders({Authorization:'Basic ' + btoa(this.cu.username+":"+ this.cu.password )});
    console.log("header localstore:");
    console.log(h);

    if(this.loginService.isLogged())
    {
      console.log(this.loginService.header);
      return this.http.post<any>("http://localhost:8080/cut", orderList, this.loginService.header);
    }
    else 
      return this.http.post<any>("http://localhost:8080/cutfree", orderList);
  }

  public sendOptions(cutOpt:CutOptions)
  {
    return this.http.post<any>("http://localhost:8080/setoptions", cutOpt, this.loginService.header);
  }
}