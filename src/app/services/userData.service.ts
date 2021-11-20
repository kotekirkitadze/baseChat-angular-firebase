import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

    // this.currentUser$ = this.auth.authState.pipe(
    //   switchMap((user) => {
    //     // Logged ina
    //     if (user) {
    //       //value changes() returns collections as observable
    //       return this.afs
    //         .doc<any>(`users/${user?.uid}`)
    //         .valueChanges();
    //     } else {
    //       // Logged out
    //       return of(null);
    //     }
    //   })
    // );
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

}
