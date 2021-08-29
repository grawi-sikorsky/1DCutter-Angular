import { Component, OnInit } from '@angular/core';
import { CutOptions } from '../../models/cutoptions';
import { CutterServiceService } from '../../services/cutter-service.service';
import { debounce, debounceTime, map } from "rxjs/operators";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cut-options',
  templateUrl: './cut-options.component.html',
  styleUrls: ['./cut-options.component.css']
})
export class CutOptionsComponent implements OnInit {

  constructor(private cutService:CutterServiceService, private http:HttpClient) 
  {
    this.submitDebounced();
  }

  cutOptions =<CutOptions>{};
  subject = new Subject();

  ngOnInit(): void {
    this.cutOptions.optionStackResult=false;
    this.cutOptions.optionSzrank=4;
  }

  public onSubmitOptions()
  {
    this.subject.next();
  }

  public submitDebounced()
  {
    this.subject.pipe( debounceTime(500) )
    .subscribe(
      () => {
        this.cutService.sendOptions(this.cutOptions)
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
