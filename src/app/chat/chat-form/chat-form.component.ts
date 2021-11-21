import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message: string = '';
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  handleSubmit(event) {
    if (event.keyCode == 13) {
      this.send()
    }
  }

  send() {
    console.log('content', this.message)
    this.chat.sendMessage(this.message);
    this.message = '';
  }

}
