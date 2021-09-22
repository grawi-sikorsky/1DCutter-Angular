import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  userTmp:User={};

  constructor(private loginService:LoginserviceService) { }

  ngOnInit(): void {
    this.userTmp = this.loginService.loggedUser;
  }
  

}