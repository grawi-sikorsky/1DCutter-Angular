import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../cutter/models/ordermodel';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {

  userTmp:User={};
  tempMdls?:OrderModel[];

  constructor(private loginService:LoginserviceService, private cutterComp:CutterComponent) { }

  ngOnInit(): void {
    console.log("loginservice.loggeduser:");
    console.log(this.loginService.loggedUser);
    console.log("temp user:");
    console.log(this.userTmp);
    this.userTmp.savedOrderModels = this.loginService.loggedUser.savedOrderModels;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
  }

  loadUserOrder(index:any, projectId:any) {
    this.loginService.loggedUser.activeOrderId! = index;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.username = this.loginService.loggedUser.username;
    
    this.loginService.loadProject(this.userTmp, this.userTmp.savedOrderModels![projectId].id)
    .subscribe( data => {
      if(data)
      {
        console.warn(this.userTmp);
        console.warn(data);
        this.cutterComp.activeOrderModel = data;
      }
    });
  }

}
