import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
} from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';

export const routes: Route[] = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'chat',
  // },
  {
    path: '',
    component: ChatroomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule { }
