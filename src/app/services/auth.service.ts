import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { UserDataService } from './userData.service';

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
  // private user: any;
  // private authState: any;

  // get currentUserId(): string {
  //   console.log(this.user.uid)
  //   return this.user != null ? this.user.uid : '';
  // }

  // get currentUserName(): string {
  //   return this.user != null ? this.user.displayName : '';
  // }

  constructor(private fireAuth: AngularFireAuth,
    private userInfoDataService: UserDataService,
    private db: AngularFirestore,
    private router: Router) {
    // this.user = fireAuth.user;

    fireAuth.onAuthStateChanged((user) => {
      this._userChange = user;
      console.log('user Changes', this._userChange);

    });
  }

  signUp(email: string, password: string, displayName: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(tap(user => {
        // this.authState = user;
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
    return of(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(

    )
    // .pipe(tap(d => {
    //   const status = 'online';
    //   // this.setUserStatus(email, status);
    // }))
  }

  // setUserStatus(email: string, status: string) {
  //   const path = `users/${this.currentUserId}`;
  //   const data = {
  //     status: status
  //   };
  // }


  logout() {
    return from(this.fireAuth.signOut());
  }
}
