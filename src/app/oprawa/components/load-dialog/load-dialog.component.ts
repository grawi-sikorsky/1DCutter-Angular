import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { ProjectModel } from '../../../cutter/models/projectmodel';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {

  userTmp:User={};
  project:ProjectModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginService:LoginserviceService, private cutterComp:CutterComponent) { }

  ngOnInit(): void {
    this.userTmp = this.loginService.loggedUser;
  }

  loadProject(projectId:any) {
    this.loginService.loggedUser.activeProjectId! = projectId;
    
    this.loginService.loadProject(this.loginService.loggedUser, this.loginService.loggedUser.savedProjectModels!.find(obj=>obj.id === projectId)!.id )
    .subscribe( data => {
      if(data)
      {
        this.loginService.loggedUser.activeProjectModel = data;
        this.loginService.loggedUser.activeProjectId = data.id;
        this.cutterComp.activeProjectModel = data;

        this.loginService.updateProfile(this.loginService.loggedUser).subscribe(
          e=>{
            console.warn(this.loginService.loggedUser)
          }
        );
      }
    });
  }

  saveProject(projectId:any){
    this.userTmp.activeProjectModel!.projectName = this.userTmp.savedProjectModels![projectId].projectName;
    
    this.userTmp.activeProjectId = projectId;
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
  
  public canAddProject()
  {
    if(this.userTmp.savedProjectModels!.length < 5) { return true; }
    else return false;
  }
  public addRow(){
    this.project.projectName = "New project name";

    this.loginService.addProject( this.project ).subscribe(
      data=>{
        console.warn(data);
        this.loginService.updateProfile(this.loginService.loggedUser).subscribe(
          e=>{
            console.warn(this.loginService.loggedUser)
          }
        );

      });
    //let index = this.userTmp.savedProjectModels!.length+1;
    //this.userTmp.savedProjectModels!.push({id:index, projectName:"New project", cutList:this.userTmp.activeProjectModel!.cutList, stockList:this.userTmp.activeProjectModel!.stockList, cutOptions:this.userTmp.activeProjectModel!.cutOptions });
  }


}
