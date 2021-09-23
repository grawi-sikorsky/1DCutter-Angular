import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../oprawa/services/loginservice.service';
import { CutOptions } from '../models/cutoptions';
import { OrderModel } from '../models/ordermodel';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  private API_URL = environment.API_URL;

  constructor(private http:HttpClient, private loginService:LoginserviceService) { }

  public getResultsAsync() : Observable<ResultBarsModule>
  {
    return this.http.get<ResultBarsModule>( this.API_URL + "/result");
  }
  public getResults()
  {
    return this.http.get<ResultBarsModule>( this.API_URL + "/result");
  }

  public sendOrder(orderList:OrderModel)
  {
    if(this.loginService.isLogged())
    {
      return this.http.post<any>( this.API_URL + "/cut", orderList);
    }
    else 
      return this.http.post<any>( this.API_URL + "/cutfree", orderList);
  }

  public setOrder(orderList:OrderModel)
  {
    return this.http.post<any>( this.API_URL + "/setorder", orderList);
  }
}
