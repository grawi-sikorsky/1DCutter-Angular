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
  isLoggedIn?:boolean;

  constructor(private service:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doLogin()
  {
    let resp = this.service.login(this.username, this.password);
    console.log(this.username + " " + this.password);

    resp.subscribe(temp => {
      this.currentUser = temp;
      console.log(this.currentUser);
      this.service.authenticated = true;
      this.router.navigate(["/home"]);
      localStorage.setItem('currentUser', JSON.stringify(temp));
      console.log( localStorage.getItem('currentUser') );
    });

    // resp.subscribe(data => {
    //   this.currentUser = data;
    //   console.log(this.currentUser.password);
    //   this.router.navigate(["/home"])

    //   console.log("data"+data);
    //   this.service.authenticated = true;
    //   console.log("user from sub: " + this.currentUser);
    // })
    
    //this.service.authenticated = true;
  }

  showUserData()
  {
    console.log("showUserData: " + this.currentUser);
  }
  
  // public findAll(): Observable<User[]>
  // {
  //   return this.http.get<User[]>(this.UsersURL);
  // }

}
