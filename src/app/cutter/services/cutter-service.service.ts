import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../../oprawa/services/user.service';
import { ProjectModel } from '../models/projectmodel';
import { ResultBarsModule } from '../models/result-bars/result-bars.module';


@Injectable({
  providedIn: 'root'
})
export class CutterServiceService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private userService: UserService) { }

  public sendOrder(project: ProjectModel) {
    if (this.userService.isLogged()) {
      return this.http.post<ResultBarsModule>(this.API_URL + "/cut", project);
    }
    else
      return this.http.post<ResultBarsModule>(this.API_URL + "/cutfree", project);
  }

  public updateProject(project: ProjectModel) {
    return this.http.patch<any>(this.API_URL + "/users/orders/" + project.id, project);
  }
}
