import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import getShoeSizes from 'app/getShoeSizes';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isDataAvailable: Boolean;
  shoeSizes: Array<String>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { 
    this.isDataAvailable = false;
  }

  async ngOnInit() {
    let titleDashes;
    this.route.paramMap.subscribe(params => {
      titleDashes = params.get('title');
    });
    let title = titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    this.shoeSizes = getShoeSizes();
    this.isDataAvailable = true;
  }

}
