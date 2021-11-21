import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ChatMessage } from '../models/chat-message.model';
import { UserDataService } from './userData.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private userDataService: UserDataService
  ) {

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(user => this.userName = user?.displayName)
    })

  }

  getUser() {
    return this.userDataService.getUserData()
  }

  getAllUsers() {
    return this.userDataService.getAllUsers();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();

    this.chatMessages.add({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    })
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }

  getMessages(): AngularFirestoreCollection<ChatMessage> {
    return this.db.collection<ChatMessage>('messages')
  }

  getMessagesForComponent() {
    return this.db.collection<ChatMessage>('messages').valueChanges().pipe(
      map(data => {
        return data.sort(function (a, b) {
          return Number(new Date(a.timeSent)) - Number(new Date(b.timeSent));
        })
      }),
    )
  }
}
