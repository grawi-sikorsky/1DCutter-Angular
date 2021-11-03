import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../oprawa/services/loginservice.service';
import { CutOptions } from '../models/cutoptions';
import { ProjectModel } from '../models/projectmodel';
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

  public sendOrder(project:ProjectModel)
  {
    if(this.loginService.isLogged())
    {
      return this.http.post<ResultBarsModule>( this.API_URL + "/cut", project);
    }
    else 
      return this.http.post<ResultBarsModule>( this.API_URL + "/cutfree", project);
  }

  public updateProject(project:ProjectModel)
  {
    return this.http.patch<any>( this.API_URL + "/users/orders/"+project.id, project);
  }
}
