import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestcompComponent } from './oprawa/components/testcomp/testcomp.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './oprawa/components/user-list/user-list.component';
import { NavbarComponent } from './oprawa/components/navbar/navbar.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';
import { FooterComponent } from './oprawa/components/footer/footer.component';
import { UserserviceService } from './oprawa/services/userservice.service';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { CutterComponent } from './cutter/components/cutter/cutter.component';
import { CutterServiceService } from './cutter/services/cutter-service.service';


@NgModule({
  declarations: [
    AppComponent,
    TestcompComponent,
    UserListComponent,
    NavbarComponent,
    UserloginComponent,
    UserregisterComponent,
    FooterComponent,
    UserProfileComponent,
    CutterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserserviceService,CutterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
