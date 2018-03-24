import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import {UserService} from 'shared/services/user.service';
import {AuthService} from 'shared/services/auth.service';
import getShoeSizes from 'app/getShoeSizes';
import {IAppUser} from 'shared/models/app-user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  appUser: IAppUser = {} as IAppUser;
  isDataAvailable: Boolean;
  titleDashes;
  shoeSizes: Array<String>;
  trade_shoe: number;
  desired_shoe: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private auth: AuthService
  ) {
  this.isDataAvailable = false;
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.route.paramMap.subscribe(params => {
      this.titleDashes = params.get('title');
    });
    let title = this.titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    this.shoeSizes = getShoeSizes();
    this.isDataAvailable = true;
  }

  createSwapRecord() {
      this.productService.createSwap(this.product.ID, this.appUser.ID, 5, 5);
  }

  trade($event) {
    console.log($event.target.value);
  }

}
