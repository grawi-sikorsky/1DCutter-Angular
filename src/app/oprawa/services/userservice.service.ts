import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private API_URL = environment.API_URL;
  private UsersURL : string;

  constructor( private http : HttpClient ) 
  {
    this.UsersURL = this.API_URL + "/test";
  }

  public findAll(): Observable<User[]>
  {
    return this.http.get<User[]>(this.UsersURL);
  }

  public addUser(user : User)
  {
    return this.http.post<User>(this.UsersURL, user);
  }
}