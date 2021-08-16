import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser:User;

  constructor(private uService:UserserviceService) 
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
    // TODO
  }
}
