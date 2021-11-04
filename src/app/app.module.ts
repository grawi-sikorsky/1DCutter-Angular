import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CutFormComponent } from './cutter/components/cut-form/cut-form.component';
import { CutOptionsComponent } from './cutter/components/cut-options/cut-options.component';
import { CutterComponent } from './cutter/components/cutter/cutter.component';
import { CutterServiceService } from './cutter/services/cutter-service.service';
import { MaterialModule } from './material/material.module';
import { CalcCuttonComponent } from './oprawa/components/calc-cutton/calc-cutton.component';
import { FooterComponent } from './oprawa/components/footer/footer.component';
import { GetuserdataComponent } from './oprawa/components/getuserdata/getuserdata.component';
import { LoadDialogComponent } from './oprawa/components/load-dialog/load-dialog.component';
import { NavbarComponent } from './oprawa/components/navbar/navbar.component';
import { ProjectNameComponent } from './oprawa/components/project-name/project-name.component';
import { SaveDialogComponent } from './oprawa/components/save-dialog/save-dialog.component';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';
import { ResultsComponent } from './cutter/components/results/results.component';


export function tokenGetter() {
  return localStorage.getItem("jwtToken");
}

@NgModule({
  declarations: [
    AppComponent,
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
    ResultsComponent,
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


  providers: [CutterServiceService, GetuserdataComponent, CutFormComponent, CutterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
