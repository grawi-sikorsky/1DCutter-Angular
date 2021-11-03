import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../../cutter/models/projectmodel';
import { GetuserdataComponent } from '../components/getuserdata/getuserdata.component';
import { User } from '../models/user';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private API_URL = environment.API_URL;

  authenticated = false;
  token       :any;
  loggedUser  :User={};
  $userStream :Observable<User>;

  constructor(private http:HttpClient, private jwtService:JwtService, private getuserdata:GetuserdataComponent) {  }

  public login(username:string, password:string)
  {
    return this.jwtService.jwtLogin(username,password);
  }

  public getUserDataAsync()
  {
    return this.$userStream = this.getuserdata.getUserData();
  }

  public logout()
  {
    return this.jwtService.logout();
  }

  public isLogged()
  {
    return this.jwtService.isLogged();
  }

  public register(user:User)
  {
    return this.http.post<User>( this.API_URL + "/register", user );
  }

  public updateProfile(user:User)
  {
    return this.http.patch<boolean>(this.API_URL + "/users", user );
  }
  public loadProject(user:User, projectId:any)
  {
    console.log("LoadProject(User): " +  JSON.stringify(user));
    return this.http.get<ProjectModel>(this.API_URL + "/users/orders/"+projectId );
  }
  public modifyProject(project:ProjectModel, projectId:any)
  {
    console.log("EDITProject(ProjectModel): " +  JSON.stringify(project));
    return this.http.patch<ProjectModel>(this.API_URL + "/users/orders/" + projectId, project );
  }
  public addProject()
  {
    console.log("ADDProject(): ");
    return this.http.post<ProjectModel>(this.API_URL + "/users/orders/", null );
  }
  public removeProject(projectId:any){
    console.log("REMOVEProject(id): " + projectId);
    return this.http.delete<void>(this.API_URL + "/users/orders/" + projectId);
  }
}
