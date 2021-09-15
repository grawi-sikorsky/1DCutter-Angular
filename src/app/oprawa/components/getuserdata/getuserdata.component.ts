import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getuserdata',
  templateUrl: './getuserdata.component.html',
  styleUrls: ['./getuserdata.component.css']
})
export class GetuserdataComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log("next!");
    this.router.navigate(["/1dcut"]);
  }

}
