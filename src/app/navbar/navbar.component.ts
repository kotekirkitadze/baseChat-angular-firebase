import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/userData.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  currentUserName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.currentUser$.subscribe(user => {
      this.currentUserName = user?.displayName

    })
  }



  logout() {
    this.userDataService.updateUser(this.authService.getCurrentUser()?.uid, 'offline')
    setTimeout(() => {
      this.authService.logout()

        .subscribe(() => {
          this.router.navigate(['login'])
        })
    }, 2000)
  }

}
