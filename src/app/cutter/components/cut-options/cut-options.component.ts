import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { CutOptions } from '../../models/cutoptions';
import { CutterServiceService } from '../../services/cutter-service.service';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { User } from 'src/app/oprawa/models/user';

@Component({
  selector: 'app-cut-options',
  templateUrl: './cut-options.component.html',
  styleUrls: ['./cut-options.component.css']
})
export class CutOptionsComponent implements OnInit {

  constructor(private cutService:CutterServiceService, private loginService:LoginserviceService) 
  {
    this.submitDebounced();
    this.cutopt = this.cutService.cutOptions;
  }

  cutopt =<CutOptions>{};
  subject = new Subject();
  currentUser   : User={};

  ngOnInit(): void {
    if(this.loginService.isLogged() === true)
    {
      this.currentUser = JSON.parse( localStorage.getItem('currentUser') ! );
      this.cutopt.optionStackResult = this.currentUser.orderModel!.cutOptions!.optionStackResult;
      this.cutopt.optionSzrank = this.currentUser.orderModel!.cutOptions!.optionSzrank;
      this.cutopt.optionPrice = this.currentUser.orderModel!.cutOptions!.optionPrice;
    }
    else
    {
      // jesli niezalogowany pobieramy z localstorage
      let localOptions = JSON.parse( localStorage.getItem('localOptions') ! );

      if(localOptions != null)
      {
        console.log("options not null");
        this.cutopt = localOptions;
      }
      else // default
      {
        console.log("local options null");
        this.cutopt.optionStackResult = false;
        this.cutopt.optionSzrank = 0;
        this.cutopt.optionPrice = false;
        localStorage.setItem('localOptions',JSON.stringify(this.cutopt));
      }
    }
  }

  public onSubmitOptions()
  {
    this.subject.next();
    this.cutService.cutOptions = this.cutopt;
    console.log("cutService.cutOptions: " + JSON.stringify(this.cutService.cutOptions));

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('localOptions',JSON.stringify(this.cutopt));
      console.log(this.cutopt);
    }
    else
    {
      //Zapisujem do local current user
      this.currentUser.orderModel!.cutOptions = this.cutopt;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(500) )
    .subscribe(
      () => {
        this.cutService.sendOptions(this.cutopt)
        .subscribe(
          data => {
            console.log("return data from send options:")
            console.log(data);
          }
        );
      }
    );
  }

  public setZeroOnErease()
  {
    if (!this.cutopt.optionSzrank)
    {
      // trick polega na tym ze gdy jest "0" to ngmodel traktuje to jako ta sama wartosc, przez co okienko pozostaje puste po usunieciu wszystkeigo.. 
      // -0 jak widac jest dla niego inna wartoscia przez co przypisuje -0 a potem zmienia sam na 0 w input field. Efekt osiadniety..
      this.cutopt.optionSzrank = -0;
    }
  }

}
