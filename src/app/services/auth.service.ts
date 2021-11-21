import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _userChange: any;

  isLoggedIn(): boolean {
    return !!this._userChange;
  }

  getCurrentUser(): any {
    return !!this._userChange
      ? this._userChange
      : null;
  }

  //divide


  // onAuthStateChanged
  private user: any;
  private authState: any;

  get currentUserId(): string {
    console.log(this.user.uid)
    return this.user != null ? this.user.uid : ''
  }

  constructor(private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
    // this.user = fireAuth.user;

    fireAuth.onAuthStateChanged((user) => {
      this._userChange = user;

    });
  }

  signUp(email: string, password: string, displayName: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(tap(user => {
        this.authState = user;
        const status = 'online';

      }))
  }

  // setUserData(email: string, displayName: string, status: string, uid) {
  //   const path = `users/${uid}`;
  //   const data = {
  //     email,
  //     displayName,
  //     status
  //   }
  //   return from(this.db.collection<{ email: string, displayName: string, status: string }>(path).add(data))
  // }

  login(email: string, password: string) {
    return of(this.fireAuth.signInWithEmailAndPassword(email, password))
      .pipe(tap(d => {
        const status = 'online';
        this.setUserStatus(email, status);
        this.router.navigate(['chat'])
      }))
  }

  setUserStatus(email: string, status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };
  }


  logout() {
    return from(this.fireAuth.signOut());
  }
}
