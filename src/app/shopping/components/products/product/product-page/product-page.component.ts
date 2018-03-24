import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import getShoeSizes from 'app/getShoeSizes';
import {AuthService} from 'shared/services/auth.service';
import {UserService} from 'shared/services/user.service';
import {IAppUser} from 'shared/models/app-user';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isDataAvailable: Boolean;
  shoeSizes: Array<String>;

  tradeShoeSize: String;
  desiredShoeSize: String;
  appUser: IAppUser = {} as IAppUser;
  swaps: any[] = [];

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
    let titleDashes;
    this.route.paramMap.subscribe(params => {
      titleDashes = params.get('title');
    });
    let title = titleDashes.split('-').join(' ');
    this.product = await this.productService.getByTitle(title);
    this.shoeSizes = getShoeSizes();
    await this.getProductSwapsForUser();
    this.isDataAvailable = true;
  }

  tradeShoe($event) {
    this.tradeShoeSize = $event.target.value;
    this.compareInAndOut();
  }

  desiredShoe($event) {
    this.desiredShoeSize = $event.target.value;
  }

  onSubmit() {
      // TODO -- more restrictions
      // 1. same user && flopped sizes
      // 2. same user && duplicate records on same size
      if (this.differentSizes()) {
        this.productService.createSwap(this.product.ID, this.appUser.ID, this.desiredShoeSize, this.tradeShoeSize);
      } else {
        // show some message
      }
  }

  async getProductSwapsForUser() {
      await this.productService.getAllSwapsForProduct(this.product.ID).subscribe(ref => {
            ref.map(v => {
              if (v.user === this.appUser.ID) {
                this.swaps.push(v);
              }
              // console.log(this.swaps);
            });
            console.log(this.swaps);
      });
  }

  async compareInAndOut() {
    let filteredList = [];
    this.swaps.forEach(val => {
      console.log(val);
      if (val.in === this.tradeShoeSize) {
        filteredList.push(val);
      }
    });
    console.log(filteredList);
  }

  differentSizes() {
      return this.desiredShoeSize !== this.tradeShoeSize;
  }

}
