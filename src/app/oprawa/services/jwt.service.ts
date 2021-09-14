import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http:HttpClient) { }

  public jwtLogin(username:string, password:string)
  {
    return this.http.post<{access_token:  string}>('http://localhost:8080/auth/login', {username, password}) // TODO: tutaj podobnie jak wczesniej base encrypt pasuje zrobic zeby plain text nie lecial
    .pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token); 
    }))
  }

  public jwtRegister(username:string, password:string, email:string)
  {
    return this.http.post<{access_token: string}>('http://localhost:8080/auth/register', {username, password, email}) //tutaj podobnie jak wczesniej base encrypt pasuje zrobic zeby plain text nie lecial
    .pipe(tap(res => {
      this.jwtLogin(username, password)
    }))
  }

  public get isLogged(): boolean
  {
    return localStorage.getItem('access_token') !== null;
  }

  public logout()
  {
    localStorage.removeItem('access_token');
  }
}
