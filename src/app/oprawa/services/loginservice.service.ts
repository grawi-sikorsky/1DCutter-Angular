import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../../cutter/models/projectmodel';
import { User } from '../models/user';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private API_URL = environment.API_URL;

  authenticated = false;
  token: any;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  public register(user: User) {
    return this.http.post<User>(this.API_URL + "/user/register", user);
  }
  public login(username: string, password: string) {
    return this.jwtService.jwtLogin(username, password);
  }
  public logout() {
    return this.jwtService.logout();
  }



  public loadProject(user: User, projectId: any) {
    return this.http.get<ProjectModel>(this.API_URL + "/user/project/" + projectId);
  }
  public modifyProject(project: ProjectModel, projectId: any) {
    return this.http.patch<ProjectModel>(this.API_URL + "/user/project/" + projectId, project);
  }
  public addProject() {
    return this.http.post<ProjectModel>(this.API_URL + "/user/project/", null);
  }
  public removeProject(projectId: any) {
    return this.http.delete<void>(this.API_URL + "/user/project/" + projectId);
  }
}
