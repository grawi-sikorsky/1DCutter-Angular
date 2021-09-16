import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { CutOptions } from '../../models/cutoptions';
import { CutterServiceService } from '../../services/cutter-service.service';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { User } from 'src/app/oprawa/models/user';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-cut-options',
  templateUrl: './cut-options.component.html',
  styleUrls: ['./cut-options.component.css']
})
export class CutOptionsComponent implements OnInit {

  constructor(private cutService:CutterServiceService, private loginService:LoginserviceService, public cutterComp:CutterComponent) 
  {
    this.submitDebounced();
  }

  //cutOptions  = <CutOptions>{};
  subject = new Subject();

  ngOnInit(): void 
  {
    // this.loginService.$userStream.subscribe(data => {
    //   this.cutterComp.orderModel.cutOptions = data.orderModel!.cutOptions;
    // })
  }

  public onSubmitOptions()
  {
    this.subject.next();
    
    console.log("loginService.cutOptions: " + JSON.stringify(this.cutterComp.orderModel!.cutOptions));

    if(!this.loginService.isLogged())
    {
      localStorage.setItem('localOptions',JSON.stringify(this.cutterComp.orderModel.cutOptions));
      console.log(this.cutterComp.orderModel.cutOptions);
    }
    else
    {
      //Zapisujem do local current user
      this.loginService.loggedUser.orderModel! = this.cutterComp.orderModel;
      localStorage.setItem('currentUser', JSON.stringify(this.loginService.loggedUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(500) )
    .subscribe(
      () => {
        this.cutService.setOrder(this.cutterComp.orderModel)
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
    if (!this.cutterComp.orderModel.cutOptions.optionSzrank)
    {
      // trick polega na tym ze gdy jest "0" to ngmodel traktuje to jako ta sama wartosc, przez co okienko pozostaje puste po usunieciu wszystkeigo.. 
      // -0 jak widac jest dla niego inna wartoscia przez co przypisuje -0 a potem zmienia sam na 0 w input field. Efekt osiadniety..
      this.cutterComp.orderModel.cutOptions.optionSzrank = -0;
    }
  }

}
