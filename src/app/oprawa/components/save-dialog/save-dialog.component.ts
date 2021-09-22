import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { OrderModel } from '../../../cutter/models/ordermodel';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  userTmp:User={};
  tempMdls?:OrderModel[];

  constructor(private loginService:LoginserviceService) { }

  ngOnInit(): void {
    this.userTmp = this.loginService.loggedUser;
    console.log(this.loginService.loggedUser);
    this.userTmp.savedOrderModels
    //this.tempMdls = this.loginService.ee
  }
  

}