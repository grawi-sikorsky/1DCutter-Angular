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
    console.log(this.loginService.loggedUser);
    this.userTmp.savedOrderModels = this.loginService.loggedUser.savedOrderModels;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
  }

  loadUserOrder(index:any)
  {
    this.loginService.loggedUser.activeOrderId! = index;
    this.userTmp.activeOrderId = this.loginService.loggedUser.activeOrderId;
    this.userTmp.username = this.loginService.loggedUser.username;
    this.loginService.updateUser(this.userTmp).subscribe( e => {
      if(e)
      {
        this.cutterComp.prepareData();
      }
    });
  }

}
