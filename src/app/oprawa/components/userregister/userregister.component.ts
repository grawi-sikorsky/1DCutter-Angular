import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  username:string = '';
  password:string = '';
  email:string = '';
  tempUser:User = {};
  badcredentials:boolean = false;

  constructor(private uService:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doRegister()
  {
    this.tempUser.username = this.username;
    this.tempUser.password = this.password;
    this.tempUser.email = this.email;
    
    let resp = this.uService.register(this.tempUser);

    resp.subscribe(returnData => {
      if(returnData === true)
      {
        this.router.navigate(["/login"]);
        this.badcredentials = false;
      }
      else
      {
        this.router.navigate(["/register"]);
        this.badcredentials = true;
        console.warn("User exists..")
      }      
    });
  
  }

}
