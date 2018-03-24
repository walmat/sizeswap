import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products', {
      query: {
        orderByChild: 'category'
      }
    });
  }

  getById(id: string) {
    return this.db.object('/products/' + id);
  }

  async getByTitle(title: string) {
    let results = await this.db.database.ref('/products').orderByChild('title').equalTo(title).once("value");
    let product = results.val();
    let ID = Object.keys(product)[0];
    product = product[ID];
    product.ID = ID;
    return product;

  }

  updateById(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  deleteById(id) {
    return this.db.object('/products/' + id).remove();
  }
}
