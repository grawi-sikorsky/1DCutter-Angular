import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { UserService } from '../../../oprawa/services/user.service';
import { CutterServiceService } from '../../services/cutter-service.service';
import { CutterComponent } from '../cutter/cutter.component';


@Component({
  selector: 'app-cut-options',
  templateUrl: './cut-options.component.html',
  styleUrls: ['./cut-options.component.css']
})
export class CutOptionsComponent implements OnInit {

  constructor(private cutService:CutterServiceService, private userService:UserService, public cutterComp:CutterComponent) 
  {
    this.submitDebounced();
  }

  subject = new Subject();

  ngOnInit(): void 
  {
  }

  public onSubmitOptions()
  {
    this.subject.next();
    
    if(!this.userService.isLogged())
    {
      localStorage.setItem('offlineUserOrder',JSON.stringify(this.cutterComp.activeProjectModel));
    }
    else
    {
      //Zapisujem do local current user
      this.userService.loggedUser.activeProjectModel! = this.cutterComp.activeProjectModel;
      localStorage.setItem('currentUser', JSON.stringify(this.userService.loggedUser));
    }
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(1000) )
    .subscribe(
      () => {
        this.cutService.updateProject(this.cutterComp.activeProjectModel)
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
    if (!this.cutterComp.activeProjectModel.cutOptions.optionSzrank)
    {
      // trick polega na tym ze gdy jest "0" to ngmodel traktuje to jako ta sama wartosc, przez co okienko pozostaje puste po usunieciu wszystkeigo.. 
      // -0 jak widac jest dla niego inna wartoscia przez co przypisuje -0 a potem zmienia sam na 0 w input field. Efekt osiagniety..
      this.cutterComp.activeProjectModel.cutOptions.optionSzrank = -0;
    }
  }

}
