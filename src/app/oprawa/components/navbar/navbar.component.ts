import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/oprawa/models/user';
import { UserService } from '../../services/user.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  localUser : User = {};
  $usr      : Observable<User>;
  $username : Observable<string>;
  username  : string = "";

  constructor(private userService:UserService, public dialog:MatDialog,private router:Router) {
  }

  ngOnInit(): void {
  }

  zalogowany() {
    this.localUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.localUser != null && ( this.localUser.username != this.username ) ) {
      this.username = this.localUser.username!;
    }
    return this.userService.isLogged();
  }

  clearLS() {
    //localStorage.clear();
    this.router.navigate(['/']);
  }

  public userProfileDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {width:"850px", data: this.userService.loggedUser.activeProjectId});
    dialogRef.afterClosed().subscribe(data=>{
      // console.log("UserProfile Dialog zamkniety");
    })
  }
  
}
