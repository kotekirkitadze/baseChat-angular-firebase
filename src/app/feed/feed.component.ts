import { Component, OnChanges, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: any;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chat.getMessages().valueChanges()
    // this.chat.getMessages().valueChanges().subscribe(console.log)
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages().valueChanges();

  }

}
