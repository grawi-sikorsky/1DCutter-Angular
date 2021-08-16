import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser:User;
  phone:String;
  website:String;

  constructor(private uService:LoginserviceService) 
  {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') ! );
  }

  ngOnInit(): void 
  {
    console.log(localStorage.getItem('currentUser'));
  }

  updateUser()
  {
    console.log("USER UPDATE:");
    let response = this.uService.updateUser(this.phone, this.website);

    response.subscribe(data =>
      {
        //console.log(data);
      });
    // TODO
  }
}
