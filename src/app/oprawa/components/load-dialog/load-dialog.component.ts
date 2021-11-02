import { Component, OnInit } from '@angular/core';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { ProjectModel } from '../../../cutter/models/projectmodel';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {

  userTmp:User={};
  tempMdls?:ProjectModel[];

  constructor(private loginService:LoginserviceService, private cutterComp:CutterComponent) { }

  ngOnInit(): void {
    console.log("loginservice.loggeduser:");
    console.log(this.loginService.loggedUser);
    console.log("temp user:");
    console.log(this.userTmp);
    this.userTmp.savedProjectModels = this.loginService.loggedUser.savedProjectModels;
    this.userTmp.activeProjectId = this.loginService.loggedUser.activeProjectId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
  }

  loadUserOrder(index:any, projectId:any) {
    this.loginService.loggedUser.activeProjectId! = index;
    this.userTmp.activeProjectId = this.loginService.loggedUser.activeProjectId;
    this.userTmp.username = this.loginService.loggedUser.username;
    
    this.loginService.loadProject(this.userTmp, this.userTmp.savedProjectModels![index].id)
    .subscribe( data => {
      if(data)
      {
        console.warn(this.userTmp);
        console.warn(data);
        this.cutterComp.activeProjectModel = data;
      }
    });
  }

}
