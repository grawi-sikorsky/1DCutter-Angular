import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private UsersURL : string;

  constructor( private http : HttpClient ) 
  {
    this.UsersURL = "http://localhost:8080/test";
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