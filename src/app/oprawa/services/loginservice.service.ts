import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { JwtService } from './jwt.service';
import { GetuserdataComponent } from '../components/getuserdata/getuserdata.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  public getUsers()
  {
    return this.http.get(this.API_URL + "/getUsers");
  }

  public register(user:User)
  {
    return this.http.post<User>( this.API_URL + "/register", user );
  }

  public updateProfile(user:User)
  {
    return this.http.post<boolean>(this.API_URL + "/profile", user );
  }
  public loadProject(user:User)
  {
    console.log("LoadProject(User): " +  JSON.stringify(user));
    return this.http.post<boolean>(this.API_URL + "/loadproject", user );
  }
  public saveProject(user:User)
  {
    console.log("SaveProject(User): " +  JSON.stringify(user));
    return this.http.post<boolean>(this.API_URL + "/saveproject", user );
  }
}
