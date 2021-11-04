import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/oprawa/models/user';
import { JwtService } from '../../services/jwt.service';
import { LoginserviceService } from '../../services/loginservice.service';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';


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

  constructor(private loginService:LoginserviceService, private jwtService:JwtService, private router:Router, private cutterComp:CutterComponent) { }

  ngOnInit(): void {
    this.loginService.authenticated=false;
    this.loginService.logout();
  }
  
  doLogin()
  {
    let resp = this.loginService.login(this.username, this.password);
    console.log(this.username + " " + this.password);

    resp.subscribe(temp => {
      console.info(temp);
      if(temp.jwtToken !== null)
      {
        this.loginService.authenticated = true;
        this.badcredentials = false;
        this.router.navigate(['/']);//.then(()=>this.cutterComp.prepareData());
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
