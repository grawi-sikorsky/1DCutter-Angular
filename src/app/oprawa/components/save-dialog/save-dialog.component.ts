import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CutFormComponent } from '../../../cutter/components/cut-form/cut-form.component';
import { ProjectModel } from '../../../cutter/models/projectmodel';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  userTmp:User={};
  tempMdls?:ProjectModel[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginService:LoginserviceService, private cutform:CutFormComponent) { }

  ngOnInit(): void {
    this.userTmp.savedProjectModels = this.loginService.loggedUser.savedProjectModels;
    this.userTmp.activeProjectId = this.loginService.loggedUser.activeProjectId;
    this.userTmp.numberOfSavedItems = this.loginService.loggedUser.numberOfSavedItems;
    this.userTmp.activeProjectModel = this.data.activeProject;
  }

  saveUserOrder(index:any){

    this.userTmp.activeProjectModel!.projectName = this.userTmp.savedProjectModels![index].projectName;
    
    this.userTmp.activeProjectId = index;
    this.userTmp.username = this.loginService.loggedUser.username;
    this.userTmp.activeProjectModel = this.data.activeProject;

    console.warn(this.userTmp);

    this.loginService.modifyProject(this.userTmp.activeProjectModel!, this.userTmp.activeProjectModel?.id).subscribe( e => {
      if(e)
      {
        console.log("Modify USER ORDER!!!!:");
        //this.cutterComp.prepareData();
      }
    });
  }

  addUserProject(index:any){
    this.userTmp.activeProjectModel!.projectName = this.userTmp.savedProjectModels![index].projectName;
    
    this.userTmp.activeProjectId = index;
    this.userTmp.username = this.loginService.loggedUser.username;
    this.userTmp.activeProjectModel = this.data.activeProject;

    console.warn(this.userTmp);

    this.loginService.addProject(this.userTmp.activeProjectModel!).subscribe( e => {
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
    if(this.userTmp.savedProjectModels!.length < 5) { return true; }
    else return false;
  }
  public addRow(){
    let index = this.userTmp.savedProjectModels!.length+1;
    this.userTmp.savedProjectModels!.push({id:index, projectName:"New project", cutList:this.userTmp.activeProjectModel!.cutList, stockList:this.userTmp.activeProjectModel!.stockList, cutOptions:this.userTmp.activeProjectModel!.cutOptions });
  }

}