import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { UserService } from '../../services/user.service';


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

  constructor(private loginService:LoginserviceService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.loginService.authenticated=false;
    this.loginService.logout();
  }
  
  doLogin()
  {
    let resp = this.loginService.login(this.username, this.password);
    console.log("Login: " + this.username + " " + this.password);

    resp.subscribe(response => {
      console.info("Logged: " + JSON.stringify(response));
      if(response.jwtToken !== null)
      {
        this.loginService.authenticated = true;
        this.badcredentials = false;
        this.userService.getUserDataAsync().subscribe(response=>{
          console.log("LoggedUser: ");
          console.log(response);
          this.userService.loggedUser = response;
        });
        this.router.navigate(['/']);
      }
      else
      {
        console.error("BAD Credentials!");
        this.badcredentials = true;
        this.loginService.authenticated = false;
      }
    });
  }  
}
