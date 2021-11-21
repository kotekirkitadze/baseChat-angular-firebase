import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { FeedComponent } from './chat/feed/feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { UserListComponent } from './chat/user-list/user-list.component';
import { UserItemComponent } from './chat/user-list/user-item/user-item.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    ChatModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
