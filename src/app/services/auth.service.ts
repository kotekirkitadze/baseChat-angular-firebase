import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;
  private authState: any;

  get currentUserId(): string {
    return this.authState != null ? this.authState.uid : ''
  }

  constructor(private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
    this.user = fireAuth.user;
  }

  signUp(email: string, password: string, displayName: string) {
    return of(this.fireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(tap(user => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status)
      }))
  }

  setUserData(email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status
    }
    of(this.db.doc(path).update(data))
  }

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
}
