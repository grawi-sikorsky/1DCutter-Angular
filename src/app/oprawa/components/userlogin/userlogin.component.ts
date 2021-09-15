import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/oprawa/models/user';
import { JwtService } from '../../services/jwt.service';
import { LoginserviceService } from '../../services/loginservice.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  username:string='';
  password:string='';
  message:any;
  currentUser?:User;
  isLoggedIn?:boolean;
  badcredentials?:boolean;

  constructor(private loginService:LoginserviceService, private jwtService:JwtService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.authenticated=false;
    this.loginService.logout();
  }

  doLogin()
  {
    let resp = this.loginService.login(this.username, this.password);
    console.log(this.username + " " + this.password);

    resp.subscribe(temp => {
      console.log(temp);
      if(temp.jwtToken !== null)
      {
        this.loginService.authenticated = true;
        this.badcredentials = false;
        this.router.navigate(["/getuserdata"]);
      }
      else
      {
        console.log("BAD Credentials!");
        this.badcredentials = true;
        this.loginService.authenticated = false;
      }
    });
  }

  showUserData()
  {
    console.log("showUserData: " + this.currentUser);
  }
  
}
