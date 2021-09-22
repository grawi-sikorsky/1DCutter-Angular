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
    console.log(this.loginService.loggedUser);
    this.userTmp.savedOrderModels = this.loginService.loggedUser.savedOrderModels;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
  }

  saveUserOrder(index:any){
    this.loginService.loggedUser.activeOrderId! = index;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.username = this.loginService.loggedUser.username;
    
    this.loginService.updateUser(this.userTmp).subscribe( e => {
      if(e)
      {
        console.log("SAVE USER ORDER!!!!:");
        console.log(this.loginService.loggedUser.savedOrderModels)
        //this.cutterComp.prepareData();
      }
    });
  }
  

}