import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = '1D Cutting Optimizer ';

  public isDark = false;

  @HostBinding('class')
  get themeMode()
  {
    return this.isDark ? 'dark-mode' : 'light-mode';
  }  
}
