import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { CutOptions } from '../../models/cutoptions';
import { CutterServiceService } from '../../services/cutter-service.service';

@Component({
  selector: 'app-cut-options',
  templateUrl: './cut-options.component.html',
  styleUrls: ['./cut-options.component.css']
})
export class CutOptionsComponent implements OnInit {

  constructor(private cutService:CutterServiceService) 
  {
    this.submitDebounced();
    this.cutopt = this.cutService.cutOptions;
  }

  cutopt =<CutOptions>{};
  subject = new Subject();

  ngOnInit(): void {
    // this.cutopt.optionStackResult=false;
    this.cutopt.optionSzrank=4;
  }

  public onSubmitOptions()
  {
    this.subject.next();
    this.cutService.cutOptions = this.cutopt;
    console.log("cutService.cutOptions: " + JSON.stringify(this.cutService.cutOptions));
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
