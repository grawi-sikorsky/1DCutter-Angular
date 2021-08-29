import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CutFormComponent } from './cutter/components/cut-form/cut-form.component';
import { CutterComponent } from './cutter/components/cutter/cutter.component';
import { CutterServiceService } from './cutter/services/cutter-service.service';
import { FooterComponent } from './oprawa/components/footer/footer.component';
import { NavbarComponent } from './oprawa/components/navbar/navbar.component';
import { TestcompComponent } from './oprawa/components/testcomp/testcomp.component';
import { UserListComponent } from './oprawa/components/user-list/user-list.component';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';
import { UserserviceService } from './oprawa/services/userservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CutOptionsComponent } from './cutter/components/cut-options/cut-options.component';

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
    CutterComponent,
    CutFormComponent,
    CutOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [UserserviceService,CutterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
