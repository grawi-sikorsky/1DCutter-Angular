import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutterComponent } from './cutter/components/cutter/cutter.component';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';

const routes: Routes = [
  { path: '', component: CutterComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UserregisterComponent },
  { path: '1dcut', component: CutterComponent },
  { path: 'profile', component: UserProfileComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
