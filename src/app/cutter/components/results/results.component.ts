import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultBarsModule } from '../../models/result-bars/result-bars.module';
import { CutterComponent } from '../cutter/cutter.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(public cutterComp:CutterComponent) { }

  results$    : Observable<ResultBarsModule>;

  ngOnInit(): void {
  }

}
