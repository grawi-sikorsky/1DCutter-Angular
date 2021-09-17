import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  tokenHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  public jwtLogin(username:string, password:string)
  {
    return this.http.post<{jwtToken:  string}>('http://localhost:8080/auth/login', {username, password})
    .pipe(tap(res => {
      if(res.jwtToken !== null)
        localStorage.setItem('jwtToken', res.jwtToken);       
    }))
  }

  public jwtRegister(username:string, password:string, email:string)
  {
    return this.http.post<{jwtToken: string}>('http://localhost:8080/auth/register', {username, password, email})
    .pipe(tap(res => {
      // TODO: obsluzyc bledna i poprawna rejestracje
      this.jwtLogin(username, password)
    }))
  }

  public isLogged(): boolean
  {
    const token = localStorage.getItem('jwtToken')!;

    return !this.tokenHelper.isTokenExpired(token);
  }

  public logout()
  {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('results');
  }
}
