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
import { UserListComponent } from './oprawa/components/user-list/user-list.component';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';
import { UserserviceService } from './oprawa/services/userservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CutOptionsComponent } from './cutter/components/cut-options/cut-options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { GetuserdataComponent } from './oprawa/components/getuserdata/getuserdata.component';
import { CalcCuttonComponent } from './oprawa/components/calc-cutton/calc-cutton.component';
import { SaveDialogComponent } from './oprawa/components/save-dialog/save-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { LoadDialogComponent } from './oprawa/components/load-dialog/load-dialog.component';
import { ProjectNameComponent } from './oprawa/components/project-name/project-name.component';


export function tokenGetter() {
  return localStorage.getItem("jwtToken");
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavbarComponent,
    UserloginComponent,
    UserregisterComponent,
    FooterComponent,
    UserProfileComponent,
    CutterComponent,
    CutFormComponent,
    CutOptionsComponent,
    GetuserdataComponent,
    CalcCuttonComponent,
    SaveDialogComponent,
    LoadDialogComponent,
    ProjectNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule,
    JwtModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { return localStorage.getItem("jwtToken") },
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["localhost:8080/auth/login"],
      },
    }),
  ],


  providers: [UserserviceService, CutterServiceService, GetuserdataComponent, CutFormComponent, CutterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
