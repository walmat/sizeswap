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
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = !this.category ? this.products
      : this.products.filter(e => e.category === this.category);
  }

  search($event) {
    let searchTerm = $event.target.value;

    if(searchTerm) {
      // console.log(this.searchService.getSearchTerm($event.target.value));
      let producttShit = this.searchService.getSearchTerm($event.target.value).map(products => products.map((product) => product.title));
      let productTitles;
      producttShit.subscribe((keys) => productTitles = keys);
      let filteredProducts = productTitles.filter((title) => {
        return title.toUpperCase().includes(searchTerm.toUpperCase());
      });
      console.log(filteredProducts);
    }
  }


}
