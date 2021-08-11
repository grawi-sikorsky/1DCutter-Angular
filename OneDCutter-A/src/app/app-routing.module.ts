import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'home', component: UserListComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UserloginComponent },
  { path: '1dcut', component: UserloginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
