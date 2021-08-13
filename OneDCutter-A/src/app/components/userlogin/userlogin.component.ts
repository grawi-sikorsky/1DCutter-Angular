import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginserviceService } from '../../services/loginservice.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  username:string;
  password:string;
  message:any;
  currentUser?:User;

  constructor(private service:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doLogin()
  {
    let resp = this.service.login(this.username, this.password);
    console.log(this.username + " " + this.password);

    resp.subscribe(temp => {this.currentUser = temp});

    // resp.subscribe(data => {
    //   this.currentUser = data;
    //   console.log(this.currentUser.password);
    //   this.router.navigate(["/home"])

    //   console.log("data"+data);
    //   this.service.authenticated = true;
    //   console.log("user from sub: " + this.currentUser);
    // })

    console.log("user from sub: " + this.currentUser);
  }

  showUserData()
  {
    console.log("user from sub: " + this.currentUser);
  }
  
  // public findAll(): Observable<User[]>
  // {
  //   return this.http.get<User[]>(this.UsersURL);
  // }

}
