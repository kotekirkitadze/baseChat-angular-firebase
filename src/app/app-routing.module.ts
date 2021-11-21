import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToItems = () =>
  redirectLoggedInTo(['chat']);
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['login']);


const ROUTES = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToItems,
    },
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'chat',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: '**',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    component: ChatroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
