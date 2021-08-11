import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  users? : User[];

  constructor(private userService : UserserviceService) { }

  ngOnInit(): void 
  {
    this.userService.findAll().subscribe( temp => {this.users = temp});
  }

}
