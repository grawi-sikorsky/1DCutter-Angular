import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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

  constructor(private loginService:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.authenticated=false;
    this.loginService.logout();
  }

  doLogin()
  {
    let resp = this.loginService.login(this.username, this.password);
    console.log(this.username + " " + this.password);

    resp.subscribe(temp => {
      this.currentUser = temp; // mozna out?
      console.log(this.currentUser);
      this.loginService.authenticated = true;

      this.router.navigate(["/home"]);

      localStorage.setItem('currentUser', JSON.stringify(temp));
      localStorage.setItem('isLogged', JSON.stringify(true));

      console.log( localStorage.getItem('currentUser') );
      console.log( localStorage.getItem('isLogged') );
    });
  }

  showUserData()
  {
    console.log("showUserData: " + this.currentUser);
  }
  
}
