import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import {UserService} from 'shared/services/user.service';
import {AuthService} from 'shared/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isDataAvailable: Boolean;
  productID;
  titleDashes;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.isDataAvailable = false;
  }

  async ngOnInit() {
    this.productID = await this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      this.titleDashes = params.get('title');
    });
    let title = this.titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    this.isDataAvailable = true;
    this.productService.createSwap(this.product.ID, this.auth.appUser$, 5, 5);
  }

}
