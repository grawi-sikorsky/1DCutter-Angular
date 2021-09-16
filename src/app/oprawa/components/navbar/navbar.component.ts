import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';

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

  constructor(public loginService: LoginserviceService) {
  }

  ngOnInit(): void {

    // this.$usr = this.loginService.getUserDataAsync();
    // this.$usr.subscribe(data => {
    //   this.username = data.username!;
    // })

    // this.loginService.getUserDataAsync().subscribe(data => {
    //   this.username = data.username!;
    //   console.log(data);
    // });

  }

  zalogowany() {

    this.localUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.localUser != null && ( this.localUser.username != this.username ) ) {
      this.username = this.localUser.username!;
      console.log(this.username);
    }

    console.log(this.username);

    return this.loginService.isLogged();
  }

  clearLS() {
    localStorage.clear();
  }
}
