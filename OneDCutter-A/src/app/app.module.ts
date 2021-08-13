import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestcompComponent } from './components/testcomp/testcomp.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserserviceService } from './services/userservice.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TestcompComponent,
    UserListComponent,
    NavbarComponent,
    UserloginComponent,
    UserregisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserserviceService,UserloginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
