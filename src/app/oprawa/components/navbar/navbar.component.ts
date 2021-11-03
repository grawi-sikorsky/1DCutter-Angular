import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';
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
  username: string="";

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

  public userProfileDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {width:"850px", data: this.loginService.loggedUser.activeProjectId});
    dialogRef.afterClosed().subscribe(data=>{
      // console.log("UserProfile Dialog zamkniety");
    })
  }
  
}
