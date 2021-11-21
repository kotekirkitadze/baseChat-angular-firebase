import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/userData.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService) { }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email, password, displayName).subscribe(
      () => {
        this.userDataService.registerData(email, displayName, 'online', this.authService.getCurrentUser()?.uid)
        this.router.navigate(['chat']);
      },
      (err) => this.errorMsg = err
    )

  }

}
