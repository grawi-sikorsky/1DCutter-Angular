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

  public getResultsAsync() : Observable<ResultBarsModule>
  {
    return this.http.get<ResultBarsModule>("https://onedcutter.herokuapp.com:8080/result");
  }
  public getResults()
  {
    return this.http.get<ResultBarsModule>("https://onedcutter.herokuapp.com:8080/result");
  }

  // TODO Ogarnac JWT !!!
  public sendOrder(orderList:OrderModel)
  {
    console.log("CutterService: POST ORDER ");

    if(this.loginService.isLogged())
    {
      return this.http.post<any>("https://onedcutter.herokuapp.com:8080/cut", orderList);
    }
    else 
      return this.http.post<any>("https://onedcutter.herokuapp.com:8080/cutfree", orderList);
  }

  public setOrder(orderList:OrderModel)
  {
    return this.http.post<any>("https://onedcutter.herokuapp.com:8080/setorder", orderList);
  }
}
