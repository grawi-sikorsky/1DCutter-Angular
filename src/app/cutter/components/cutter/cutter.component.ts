import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../../../oprawa/services/loginservice.service';
import { ProjectModel } from '../../models/projectmodel';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterServiceService } from '../../services/cutter-service.service';
import { UserService } from '../../../oprawa/services/user.service';
import { ResultService } from '../../services/result.service';


@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(public cutService:CutterServiceService, public loginService:LoginserviceService, private userService:UserService, private resultService:ResultService ) {
    this.activeProjectModel.cutList=[{cutLength:225,cutPcs:5}];
    this.activeProjectModel.stockList=[{idFront:0, stockLength:1000, stockPcs:10, stockPrice:0}];
    this.activeProjectModel.cutOptions={ id:0, optionStackResult:false, optionSzrank:0, optionPrice:false, optionAlgo:false, optionIterations:500, optionVariantsQ:true }
    this.activeProjectModel.projectName="Default";
    this.activeProjectModel.projectCreated = new Date();
  }

  results$    : Observable<ResultBarsModule>;
  results     : ResultBarsModule;
  filtered    : ResultBarsModule;     // stackSameBars
  stackedBars   = <ResultBarsModule>{}; // stack2
  stackedRemain = <ResultBarsModule>{}; // stack3
  unstackedBars   = <ResultBarsModule>{}; // stack2
  unstackedRemain = <ResultBarsModule>{}; // stack3
  activeProjectModel  = <ProjectModel>{};
  
  ngOnInit(): void 
  {
    this.prepareData();
  }

  // cleanString(str:string) {
  //     str = str.replace('"{', '{');
  //     str = str.replace('}"', '}');
  //   return str;
  // }

  public prepareData()
  {
    if(this.userService.isLogged() === true)
    {
      this.userService.getUserDataAsync().subscribe( data => {
        this.activeProjectModel = data.activeProjectModel!;
        this.userService.loggedUser = data;
        this.userService.userDataLoaded = true;
        
        this.resultService.prepareResults();
        localStorage.setItem('currentUser', JSON.stringify(data));
      });
    }
    else
    {
      // jesli niezalogowany pobieramy z localstorage
      let localOfflineUser  = JSON.parse( localStorage.getItem('offlineUserOrder') ! );

      if(localOfflineUser != null)
      {
        console.log("LocalOfflineUser exists:");
        this.activeProjectModel   = localOfflineUser;
      }
      else // default
      {
        console.log("LocalOfflineUser null:");
        localStorage.setItem('offlineUserOrder', JSON.stringify(this.activeProjectModel));
      }
      
      this.userService.loggedUser.activeProjectModel  = this.activeProjectModel;
    }
  }
}