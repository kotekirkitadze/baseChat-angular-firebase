import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'signup',
    component: SignupFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
