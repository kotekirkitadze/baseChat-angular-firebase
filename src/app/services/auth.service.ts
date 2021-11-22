import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _userChange: User;

  isLoggedIn(): boolean {
    return !!this._userChange;
  }

  getCurrentUser(): User {
    return !!this._userChange
      ? this._userChange
      : null;
  }

  constructor(private fireAuth: AngularFireAuth) {
    fireAuth.onAuthStateChanged((user) => {
      this._userChange = user;
    });
  }

  signUp(email: string, password: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string) {
    return of(this.fireAuth.signInWithEmailAndPassword(email, password));
  }


  logout() {
    return from(this.fireAuth.signOut());
  }
}
