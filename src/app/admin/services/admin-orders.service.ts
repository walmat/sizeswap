import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AdminOrders {

  constructor(private db: AngularFireDatabase) { }
  
  getAll() {
    return this.db.list('/pendingSwaps', {
      query: {
      }
    });
  }
}
