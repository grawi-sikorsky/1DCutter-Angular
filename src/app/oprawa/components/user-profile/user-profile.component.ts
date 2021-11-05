import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/oprawa/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser:User;
  updUser:User;

  constructor(private userService:UserService) 
  {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') ! );
    this.updUser = new User;
  }

  ngOnInit(): void 
  {
  }

  updateProfile()
  {
    this.updUser.username   = this.currentUser.username;
    this.updUser.phone      = this.currentUser.phone;
    this.updUser.website    = this.currentUser.website;
    // Zamiast puscic od razu currentUser robitmy taka lipe u gory bo puszczajac authorities ktore ze springa ma postac tablicy wywala blad.
    // Prawdopodobnie User model ma stringa zamiast tablicy i puszczajac JSONa Spring nie moze tego zparsowac do tablicy UserModel.

    console.log("USER: " + JSON.stringify(this.updUser));
    
    let response = this.userService.updateProfile(this.updUser);

    response.subscribe(returnData => {
      if(returnData === true)
      {
        console.log("User updated.." + returnData);
      }
      else
      {
        console.log("User NOT updated.." + returnData)
      }
      });

  }
}
