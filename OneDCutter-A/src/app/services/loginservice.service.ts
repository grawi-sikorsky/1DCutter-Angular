import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateSourceUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  authenticated = false;

  constructor(private http:HttpClient) {  }

  public login(username:string, password:string)
  {
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(username+":"+password)});
    //return this.http.post("http://localhost:8080/login",{headers, responseType:'text' as 'json'} );

    console.log(headers);
    console.log();
    return this.http.get<User>("http://localhost:8080/login", {headers} );
    //.subscribe(utmp => this.currentUser = utmp);  // responseType:'text' as 'json'
  }

  public getUsers()
  {
    let username="kloc";
    let password="kloc";
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(username+":"+password)});
    return this.http.get("http://localhost:8080/getUsers",{headers} );
  }

  public register(user:User)
  {
    return this.http.post<User>("http://localhost:8080/register", user );
  }

}
