import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserDataService } from '../../services/userData.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getAllUsers()
      .subscribe(
        users => { this.users = users; }
      )
  }

}
