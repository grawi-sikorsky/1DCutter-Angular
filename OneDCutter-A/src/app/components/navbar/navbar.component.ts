import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginserviceService : LoginserviceService) { }

  ngOnInit(): void {
  }

  zalogowany()
  { 
    return this.loginserviceService.isLogged();
  }
}
