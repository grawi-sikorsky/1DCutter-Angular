import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { User } from '../../models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {

  userTmp: User = {};
  projectName : string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public loginService: LoginserviceService, public userService: UserService, private cutterComp: CutterComponent) { }

  ngOnInit(): void {
  }

  loadProject(projectId: any) {
    this.userService.loggedUser.activeProjectId! = projectId;

    this.loginService.loadProject(this.userService.loggedUser, this.userService.loggedUser.savedProjectModels!.find(obj => obj.id === projectId)!.id)
      .subscribe(data => {
        if (data) {
          this.userService.loggedUser.activeProjectModel = data;
          this.userService.loggedUser.activeProjectId = data.id;
          this.userService.updateProfile(this.userService.loggedUser).subscribe(
            returnUser => {
              this.userService.loggedUser = returnUser;
              console.warn(this.userService.loggedUser)
            }
          );
        }
      });
  }

  saveProject(projectId: any) {
    console.warn("Save project: ")
    console.warn(this.userService.loggedUser);

    this.userService.loggedUser.activeProjectModel!.projectName = this.userService.loggedUser.savedProjectModels!.find(obj => obj.id === projectId)!.projectName;

    this.loginService.modifyProject(this.userService.loggedUser.activeProjectModel!, projectId).subscribe(e => {
      if (e) {
        console.log("Project Modified");
      }
    });
  }

  removeProject(projectId: any) {
    this.loginService.removeProject(projectId).subscribe(
      e => {
        this.cutterComp.prepareData();
        this.userTmp = this.userService.loggedUser;
      }
    );
  }

  public canAddProject() {
    if (this.userService.loggedUser.savedProjectModels!.length < 5) { return true; }
    else return false;
  }

  public addRow() {
    this.loginService.addProject().subscribe(
      data => {
        this.cutterComp.prepareData();

        this.userService.updateProfile(this.userService.loggedUser).subscribe( e => { } );
      });
  }



}
