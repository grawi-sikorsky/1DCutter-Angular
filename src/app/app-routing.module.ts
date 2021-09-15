import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutterComponent } from './cutter/components/cutter/cutter.component';
import { GetuserdataComponent } from './oprawa/components/getuserdata/getuserdata.component';
import { UserListComponent } from './oprawa/components/user-list/user-list.component';
import { UserProfileComponent } from './oprawa/components/user-profile/user-profile.component';
import { UserloginComponent } from './oprawa/components/userlogin/userlogin.component';
import { UserregisterComponent } from './oprawa/components/userregister/userregister.component';

const routes: Routes = [
  { path: 'home', component: UserListComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UserregisterComponent },
  { path: 'dupa', component: UserListComponent },
  { path: '1dcut', component: CutterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'getuserdata', component: GetuserdataComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
