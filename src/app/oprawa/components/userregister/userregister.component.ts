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
  badcredentials:boolean;


  constructor(private uService:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doRegister()
  {
    console.log("Loginservice: Register:");
    console.log(this.username + this.password + this.email);
    this.tempUser.username = this.username;
    this.tempUser.password = this.password;
    this.tempUser.email = this.email;
    
    console.log(this.tempUser);

    let resp = this.uService.register(this.tempUser);

    resp.subscribe(returnData => {
      if(returnData === true)
      {
        this.router.navigate(["/login"]);
        console.log(returnData);
        console.log("User added..");
      }
      else
      {
        this.router.navigate(["/register"]);
        this.badcredentials = true;
        console.log(returnData);
        console.log("User exists..")
      }      
    });
  
  }

}
