import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../oprawa/services/user.service';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(public userService:UserService, public resultService:ResultService) { }

  ngOnInit(): void {

    this.resultService.isWorking = true;
    //this.resultService.results = JSON.parse(localStorage.getItem('results')!);
    if(this.resultService.results != null){
      this.resultService.isWorking = false;
    }
  }


}
