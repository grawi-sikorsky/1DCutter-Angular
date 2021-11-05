import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../oprawa/services/user.service';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(public userService:UserService, public resultService:ResultService) { }

  ngOnInit(): void {
    //this.resultService.getResults();
  }


}
