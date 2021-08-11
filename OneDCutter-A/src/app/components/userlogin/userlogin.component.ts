import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(private service:LoginserviceService, private router:Router) { }

  ngOnInit(): void {
  }

  doLogin()
  {
    let resp = this.service.login(this.username, this.password);
    resp.subscribe(data => {
      this.router.navigate(["/home"])
      console.log(data);
    })
  }

}
