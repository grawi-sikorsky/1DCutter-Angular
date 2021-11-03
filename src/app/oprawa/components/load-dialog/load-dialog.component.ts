import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {

  userTmp:User={};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public loginService:LoginserviceService, private cutterComp:CutterComponent) { }

  ngOnInit(): void {
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
    console.warn(this.loginService.loggedUser);

    this.loginService.modifyProject(this.loginService.loggedUser.activeProjectModel!, projectId).subscribe( e => {
      if(e)
      {
        console.log("Modify USER ORDER!!!!:");
        //this.cutterComp.prepareData();
      }
    });
  }

  removeProject(projectId:any){
    this.loginService.removeProject(projectId).subscribe(
      e=>{
        this.cutterComp.prepareData();
        this.userTmp = this.loginService.loggedUser;
      }
    );
  }
  
  public canAddProject()
  {
    if(this.loginService.loggedUser.savedProjectModels!.length < 5) { return true; }
    else return false;
  }

  public addRow(){
    this.loginService.addProject().subscribe(
      data=>{
        this.cutterComp.prepareData();

        this.loginService.updateProfile(this.loginService.loggedUser).subscribe(
          e=>{ }
        ); 
      });
  }



}
