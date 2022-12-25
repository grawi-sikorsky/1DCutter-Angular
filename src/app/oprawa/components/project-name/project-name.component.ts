import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CutterComponent } from '../../../cutter/components/cutter/cutter.component';
import { LoadDialogComponent } from '../../../oprawa/components/load-dialog/load-dialog.component';
import { LoginserviceService } from '../../services/loginservice.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.css']
})
export class ProjectNameComponent implements OnInit {

  constructor(public loginService:LoginserviceService, public userService:UserService, public cutterComp:CutterComponent, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.cutterComp.prepareData();
  }

  public loadDialog(): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {width:"850px", data: {loggedUser: this.userService.loggedUser} });

    dialogRef.afterClosed().subscribe(data=>{
      this.cutterComp.prepareData();
    })
  }
}
