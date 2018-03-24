import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor(private db: AngularFireDatabase) { }

  getSearchTerm(term){
    return this.db.list('/products', {
        query: {
          
        }
      });
  }
}