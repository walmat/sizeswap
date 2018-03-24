import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    let titleDashes;
    this.route.paramMap.subscribe(params => {
      titleDashes = params.get('title');
    });
    let title = titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    console.log(this.product);
  }

}
