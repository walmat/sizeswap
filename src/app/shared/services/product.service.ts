import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


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
    let results = await this.db.database.ref('/products').orderByChild('title').equalTo(title).once('value');
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

  getSwap(product_id: string, swap_id: string) {
    return this.db.object('/products/' + product_id + '/swaps/' + swap_id);
  }

  createSwap(id, user, size_desired, size_has) {
    return this.db.list('/products/' + id + '/swaps/').push({
       user: user,
       in: size_has,
       out: size_desired
    });
  }

  getAllSwapsForProduct(id) {
      return this.db.list('/products/' + id + '/swaps/');
  }
}
