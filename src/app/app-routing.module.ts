import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';


const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'chat',
    component: ChatroomComponent,
  },
  {
    path: '**',
    component: ChatroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
