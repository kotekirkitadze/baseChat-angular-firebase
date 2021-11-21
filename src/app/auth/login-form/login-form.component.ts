import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/userData.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthService,
    private router: Router,
    private userInfoDataService: UserDataService) { }

  ngOnInit(): void {
  }

  signIn() {
    const email = this.email;
    const password = this.password;
    this.authService.login(email, password)
      .pipe(finalize(() => {
        setTimeout(() => {
          this.userInfoDataService.updateUser(this.authService.getCurrentUser()?.uid, 'online')
        }, 2000)
      }))
      .subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['chat']);
        }, 1000)
      });
  }

}
