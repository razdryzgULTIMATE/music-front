import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'cabinet/:username', component: UserComponent},
  {path: 'admin', component: AdminComponent},

];
