import { Component, OnInit } from '@angular/core';
import { TestServiceService, JsonExchangeRates } from '../../services/test-service.service';

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css']
})
export class TestcompComponent implements OnInit {

  title: string;
  varson: string;
  jsonik: JsonExchangeRates;

  constructor(private testServiceService : TestServiceService) {
    this.title = "Kupa w konstruktorze";
    this.varson = "var";
    //this.jsonik
   }

  ngOnInit(): void {
    //this.title = "Kupa Gowna w komponencie";
    this.testServiceService.getJson().subscribe( val => {
      this.jsonik = val;
    });
  }

  czendzvar()
  {
    this.title = "Kupa Gowna w komponencie po funkcji Czendż nejm"
  }

  valmet(value: string)
  {
    this.varson = "Kupa varow " + value;
  }

}
