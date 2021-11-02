import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Component({
  selector: 'app-getuserdata',
  templateUrl: './getuserdata.component.html',
  styleUrls: ['./getuserdata.component.css']
})
export class GetuserdataComponent implements OnInit {

  private API_URL = environment.API_URL;

  constructor(private http:HttpClient ) { }

  ngOnInit(): void {
    let temp = this.http.get<User>(this.API_URL + "/users");
    temp.subscribe( (e) => {
      localStorage.setItem('currentUser', JSON.stringify(e));
      console.log("subscribed getuserdata copomnent init:");
      console.log(e);
    });
  }

  public getUserData()
  {
    return this.http.get<User>( this.API_URL + "/users");
  }

}
