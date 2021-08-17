import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CutterServiceService } from '../../services/cutter-service.service';
import { FirstFit } from '../../models/first-fit';

@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.css']
})
export class CutterComponent implements OnInit {

  constructor(private cutService:CutterServiceService) {  }

  listStock?:FirstFit[];
  orderity:any;

  ngOnInit(): void 
  { 
    let respo = this.cutService.getCutResult();
    respo.subscribe(
      returnData => {
        console.log("return data: " + JSON.stringify(returnData));
        this.listStock = returnData;
        console.log("listStock:" + JSON.stringify( this.listStock ));
    });

    let respo2 = this.cutService.sendOrder();
    respo2.subscribe(
      returnData => {
        console.log("return data: " + JSON.stringify(returnData));
        this.orderity = returnData;
        console.log("listStock:" + JSON.stringify( this.orderity ));
    });
  }

  public costam()
  {
    //this.listStock?.entries();
  }



}