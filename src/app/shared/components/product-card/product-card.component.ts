import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { IProduct } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: IProduct;
  @Input('width') width = '20';
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  // addToCart() {
  //   this.cartService.addToCart(this.product);
  // }

  selectProduct() {
    let titleWithDashes = this.product.title.split(' ').join('-');
    this.route.navigateByUrl(`/products/${titleWithDashes}`);
  }

}
