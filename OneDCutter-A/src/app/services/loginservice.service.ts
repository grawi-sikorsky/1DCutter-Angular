import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  public login(username:string, password:string)
  {
    const headers = new HttpHeaders({AUthorization:'Basic ' + btoa(username+":"+password)});
    return this.http.get("http://localhost:8080/login",{headers, responseType:'text' as 'json'} );
  }

  public getUsers()
  {
    let username="kloc";
    let password="kloc";
    const headers = new HttpHeaders({AUthorization:'Basic ' + btoa(username+":"+password)});
    return this.http.get("http://localhost:8080/getUsers",{headers} );
  }
}
