import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/oprawa/models/user';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usr:User={};

  constructor(private loginserviceService : LoginserviceService) {
    let cu = JSON.parse( localStorage.getItem('currentUser') ! );
  }

  ngOnInit(): void {
    this.usr.username='Niezalogowany członku';
  }

  zalogowany()
  {
    let cu = JSON.parse( localStorage.getItem('currentUser') ! );
    if(cu != null)
    {
      this.usr = cu;
    }
    else{ this.usr.username='Niezalogowany członku'; }
  
    return this.loginserviceService.isLogged();
  }
}
