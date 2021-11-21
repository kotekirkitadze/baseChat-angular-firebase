import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/userData.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: string[];
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getAllUsers().valueChanges()
      .subscribe(
        users => { this.users = users; console.log('parent', this.users) }
      )
  }

}
