import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutterComponent } from './components/cutter/cutter.component';
import { TestcompComponent } from './components/testcomp/testcomp.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UserregisterComponent } from './components/userregister/userregister.component';

const routes: Routes = [
  { path: 'home', component: UserListComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UserregisterComponent },
  { path: 'dupa', component: UserListComponent },
  { path: 'test', component: TestcompComponent },
  { path: '1dcut', component: CutterComponent },
  { path: 'profile', component: UserProfileComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
