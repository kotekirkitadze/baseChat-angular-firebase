import { Component, OnChanges, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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
    this.feed = this.chat.getMessages().valueChanges().pipe(
      map(data => {
        return data.sort(function (a, b) {
          return Number(new Date(a.timeSent)) - Number(new Date(b.timeSent));
        })
      }),
    )
    // this.chat.getMessages().valueChanges().subscribe(console.log)
  }

  ngOnChanges() {



  }

}
