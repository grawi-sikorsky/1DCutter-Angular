import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  username:string;
  password:string;
  email:string;
  tempUser:User;

  constructor(private uService:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doRegister()
  {
    // this.uService.register(this.username, this.password, this.email).subscribe(
    //   data =>
    //   {
    //     this.router.navigate(["/login"]);
    //   });
    console.log("Loginservice: Register:");
    console.log(this.username + this.password + this.email);
    this.tempUser.username = this.username;
    this.tempUser.password = this.password;
    this.tempUser.email = this.email;
    console.log(this.tempUser);


    let resp = this.uService.register(this.tempUser);

    resp.subscribe(temp => {
      this.router.navigate(["/login"]);
      //localStorage.setItem('currentUser', JSON.stringify(temp));
      //console.log( localStorage.getItem('currentUser') );
    });
  
  }

}
