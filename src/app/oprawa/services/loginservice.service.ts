import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { JwtService } from './jwt.service';
import { GetuserdataComponent } from '../components/getuserdata/getuserdata.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

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
    return this.http.get("https://onedcutter.herokuapp.com:8080/getUsers");
  }

  public register(user:User)
  {
    return this.http.post<User>("https://onedcutter.herokuapp.com:8080/register", user );
  }

  public updateUser(user:User)
  {
    console.log("UpdateUser(User): " +  JSON.stringify(user));
    return this.http.post<boolean>("https://onedcutter.herokuapp.com:8080/profile", user );
  }

}
