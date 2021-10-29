import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { OrderModel } from '../../../cutter/models/ordermodel';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { CutFormComponent } from '../../../cutter/components/cut-form/cut-form.component';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  userTmp:User={};
  tempMdls?:OrderModel[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginService:LoginserviceService, private cutform:CutFormComponent) { }

  ngOnInit(): void {
    this.userTmp.savedOrderModels = this.loginService.loggedUser.savedOrderModels;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
    this.userTmp.activeOrderModel = this.data.activeOrder;
  }

  saveUserOrder(index:any){

    this.userTmp.activeOrderModel!.projectName = this.userTmp.savedOrderModels![index].projectName;
    
    this.userTmp.activeOrderId = index;
    this.userTmp.username = this.loginService.loggedUser.username;
    this.userTmp.activeOrderModel = this.data.activeOrder;

    console.warn(this.userTmp);

    this.loginService.saveProject(this.userTmp).subscribe( e => {
      if(e)
      {
        console.log("SAVE USER ORDER!!!!:");
        //this.cutterComp.prepareData();
      }
    });
  }

  addUserProject(index:any){
    this.userTmp.activeOrderModel!.projectName = this.userTmp.savedOrderModels![index].projectName;
    
    this.userTmp.activeOrderId = index;
    this.userTmp.username = this.loginService.loggedUser.username;
    this.userTmp.activeOrderModel = this.data.activeOrder;

    console.warn(this.userTmp);

    this.loginService.addProject(this.userTmp).subscribe( e => {
      if(e)
      {
        console.log("ADD USER ORDER!!!!:");
        //this.cutterComp.prepareData();
      }
    });
  }


  addNewUserOrder(index:any){

  }
  
  public canAddProject()
  {
    if(this.userTmp.savedOrderModels!.length < 5) { return true; }
    else return false;
  }
  public addRow(){
    let index = this.userTmp.savedOrderModels!.length+1;
    this.userTmp.savedOrderModels!.push({id:index, projectName:"New project", cutList:this.userTmp.activeOrderModel!.cutList, stockList:this.userTmp.activeOrderModel!.stockList, cutOptions:this.userTmp.activeOrderModel!.cutOptions });
  }

}