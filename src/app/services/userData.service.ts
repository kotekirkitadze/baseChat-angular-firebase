import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserDataService {

  private userCollections: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  currentUser$: Observable<any>;
  itemDoc: AngularFirestoreDocument<any>;


  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.userCollections =
      this.afs.collection('users');
    this.items =
      this.userCollections.valueChanges();

    this.currentUser$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .doc<any>(`users/${user?.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUserData(): Observable<User> {
    return this.currentUser$;
  }

  getAllUsers(): Observable<User[]> {
    return this.afs.collection<User>('users').valueChanges();
  }

  registerData(email: string, displayName: string, status: string, userId: string) {
    this.userCollections
      .doc(userId)
      .set({
        email,
        displayName,
        status
      });
  }

  updateUser(uid, status) {
    const reneWedUser = { status };
    this.afs.doc(
      `users/${uid}`
    ).update(reneWedUser);
  }

}
