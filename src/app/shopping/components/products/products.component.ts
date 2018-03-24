import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { IProduct } from 'shared/models/product';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  filteredProducts: IProduct[];
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        this.filteredProducts = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {;
      });
  }

  search($event) {
    let searchTerm = $event.target.value;
    this.filteredProducts = this.products.filter((product) => {
      return product.title.toUpperCase().includes(searchTerm.toUpperCase()) || product.category.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }


}
