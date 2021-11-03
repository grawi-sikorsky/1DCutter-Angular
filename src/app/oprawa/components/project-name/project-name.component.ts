import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { LoadDialogComponent } from '../../../oprawa/components/load-dialog/load-dialog.component';
import { SaveDialogComponent } from '../../../oprawa/components/save-dialog/save-dialog.component';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.css']
})
export class ProjectNameComponent implements OnInit {

  constructor(public loginService:LoginserviceService, public cutterComp:CutterComponent, public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public loadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {width:"850px", data: {loggedUser: this.loginService.loggedUser} });

    dialogRef.afterClosed().subscribe(data=>{
      this.cutterComp.prepareData();
    })
  }
  public saveDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {width:"850px",  data: {savedProjects: this.loginService.loggedUser.savedProjectModels, activeProject: this.cutterComp.activeProjectModel}});

    dialogRef.afterClosed().subscribe(data=>{
      this.cutterComp.prepareData();
    })

  }

}
