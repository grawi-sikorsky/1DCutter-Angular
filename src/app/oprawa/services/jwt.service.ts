import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private API_URL = environment.API_URL;
  
  tokenHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  public jwtLogin(username:string, password:string)
  {
    return this.http.post<{jwtToken:  string}>( this.API_URL + '/user/auth', {username, password})
    .pipe(tap(res => {
      if(res.jwtToken !== null)
        localStorage.setItem('jwtToken', res.jwtToken);
    }))
  }

  public isLogged(): boolean
  {
    const token = localStorage.getItem('jwtToken')!;
    if (this.tokenHelper.isTokenExpired(token))
    {
      this.logout();
    }
    return !this.tokenHelper.isTokenExpired(token);
  }

  public logout()
  {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('results');
  }
}
