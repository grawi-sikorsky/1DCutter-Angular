import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  localUser: User = {};
  $usr: Observable<User>;
  $username: Observable<string>;
  username: string;

  constructor(public loginService: LoginserviceService, public dialog:MatDialog) {
  }

  ngOnInit(): void {
  }

  zalogowany() {

    this.localUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.localUser != null && ( this.localUser.username != this.username ) ) {
      this.username = this.localUser.username!;
    }
    return this.loginService.isLogged();
  }

  clearLS() {
    localStorage.clear();
  }

  public loadDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {width:"700px", data: this.loginService.loggedUser.activeOrderId});

    dialogRef.afterClosed().subscribe(data=>{
      console.log("LOAD dialog zamkniety");
      this.loginService.loggedUser.activeOrderId = data;

      //this.cutterComp.prepareData();
    })
  }
  
}
