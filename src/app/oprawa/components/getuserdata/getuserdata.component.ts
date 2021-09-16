import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { UserserviceService } from '../../services/userservice.service';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-getuserdata',
  templateUrl: './getuserdata.component.html',
  styleUrls: ['./getuserdata.component.css']
})
export class GetuserdataComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient ) { }

  ngOnInit(): void {
    console.log("next!");

    let temp = this.http.get<User>("http://localhost:8080/getuserdata");
    temp.subscribe( (e) => {
      localStorage.setItem('currentUser', JSON.stringify(e));
      console.log("subscribed getuserdata copomnent init:");
      console.log(e);
    });

    // this.router.navigate(["/1dcut"]);
  }

  public getUserData()
  {
    return this.http.get<User>("http://localhost:8080/getuserdata");
  }

}
