import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { UserDataService } from '../services/userData.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  currUserName: string;

  constructor(private userInfoDataService: UserDataService) { }

  ngOnInit(): void {
    this.userInfoDataService.currentUser$.subscribe(
      d => this.currUserName = d.displayName
    )
  }

  isOwnMessage() {
    return this.chatMessage.userName == this.currUserName;
  }

}
