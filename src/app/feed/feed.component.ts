import { Component, OnChanges, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: any[];

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    // this.chat.getMessagesForComponent().subscribe(
    //   msg => this.feed = msg
    // );

    // this.chat.getMessages().valueChanges().subscribe(console.log)
  }

  ngOnChanges() {
  }

}
