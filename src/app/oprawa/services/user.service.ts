import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;
  public loggedUser  :User={};
  public $userStream :Observable<User> | undefined;
  public userDataLoaded:boolean=false;

  constructor(private http:HttpClient, private jwtService:JwtService) { }

  public isLogged()
  {
    return this.jwtService.isLogged();
  }
  public getUserDataAsync()
  {
    return this.$userStream = this.getUserData();
  }
  public getUserData()
  {
    return this.http.get<User>( this.API_URL + "/user");
  }
  public updateProfile(user:User)
  {
    return this.http.patch<User>(this.API_URL + "/user", user );
  }
}
