import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { SearchService } from 'shared/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { IProduct } from 'shared/models/product';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [SearchService]
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  filteredProducts: IProduct[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private searchService: SearchService,
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
      .subscribe(params => {
        this.category = params.get('category');
        console.log(this.category);
      });
  }

  search($event) {
    let searchTerm = $event.target.value;
    this.filteredProducts = this.products.filter((product) => {
      return product.title.toUpperCase().includes(searchTerm.toUpperCase()) || product.category.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }


}
