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
  @Input('width') width;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  selectProduct() {
    let titleWithDashes = this.product.title.split(' ').join('-');
    this.route.navigateByUrl(`/products/${titleWithDashes}`);
  }

}
