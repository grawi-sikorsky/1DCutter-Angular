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
    const dialogRef = this.dialog.open(LoadDialogComponent, {width:"600px", data: this.loginService.loggedUser.activeOrderId});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("LOAD dialog zamkniety");
      this.loginService.loggedUser.activeOrderId = data;

      this.cutterComp.prepareData();
    })
  }
  public saveDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {width:"600px",  data: {savedOrders: this.loginService.loggedUser.savedOrderModels, activeOrder: this.cutterComp.activeOrderModel}});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("SAVE dialog zamkniety");
      
      //this.loginService.loggedUser.savedOrderModels = data;

      this.cutterComp.prepareData();
    })

  }

}
