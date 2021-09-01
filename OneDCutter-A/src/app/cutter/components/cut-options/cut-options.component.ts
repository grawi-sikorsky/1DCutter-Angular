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
        localStorage.setItem('localOptions',JSON.stringify(this.cutopt));
      }
    }
  }

  public onSubmitOptions()
  {
    debugger
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
      this.currentUser.cutOptions = this.cutopt;
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

}
