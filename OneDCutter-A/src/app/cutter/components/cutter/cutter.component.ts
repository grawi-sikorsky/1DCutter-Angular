import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CutterServiceService } from '../../services/cutter-service.service';

@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {  }

  listStock?:string[];


  ngOnInit(): void 
  { 
    let respo = this.cutService.getCutResult();
    respo.subscribe(
      returnData => {
        console.log("return data: " + JSON.stringify(returnData));
        this.listStock = returnData;
        console.log("listStock:" + JSON.stringify( this.listStock ));
    });
  }

  public costam()
  {
    this.listStock?.entries();
  }



}