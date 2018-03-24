import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isDateAvailable: Boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { 
    this.isDateAvailable = false;
  }

  async ngOnInit() {
    let titleDashes;
    this.route.paramMap.subscribe(params => {
      titleDashes = params.get('title');
    });
    let title = titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    this.isDateAvailable = true;
    console.log(this.product);
    console.log('DONE');
  }

}
