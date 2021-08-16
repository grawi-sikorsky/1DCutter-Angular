import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TestcompComponent } from './components/testcomp/testcomp.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: UserListComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UserregisterComponent },
  { path: 'dupa', component: UserloginComponent },
  { path: 'test', component: TestcompComponent },
  { path: '1dcut', component: UserloginComponent },
  { path: 'profile', component: UserProfileComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
