import { Observable } from 'rxjs/Observable';
import { IAppUser } from '../models/app-user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  add(user: firebase.User) {
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string) {
    return this.db.object('/user/' + uid) as Observable<IAppUser>;
  }

  async save(uID, username, ad1, ad2, city, state, zip) {
      return this.db.object('/user/' + uID + '/shipping-info/').update( {
         ID: uID,
         username: username,
         address: ad1 + ad2,
         city: city,
         state: state,
         zipcode: zip
      });
  }

}
