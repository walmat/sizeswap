import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { IProduct } from 'shared/models/product';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  filteredProducts: IProduct[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
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
      });
  }

  search($event) {
    let searchTerm = $event.target.value;
    this.filteredProducts = this.products.filter((product) => {
      return product.title.toUpperCase().includes(searchTerm.toUpperCase())
          || product.category.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }


}
