import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import getShoeSizes from 'app/getShoeSizes';
import {AuthService} from 'shared/services/auth.service';
import {UserService} from 'shared/services/user.service';
import {IAppUser} from 'shared/models/app-user';

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
  filtered_list: any[] = [];
  opposites_list: any[] = [];

    constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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

  async tradeShoe($event) {
    this.filtered_list = [];
    this.opposites_list = [];
    this.swaps = [];
    await this.getProductSwapsForUser();
    this.tradeShoeSize = $event.target.value;
    this.compareInAndOut(this.tradeShoeSize);
  }

  desiredShoe($event) {
    this.desiredShoeSize = $event.target.value;
  }

  onSubmit() {
      if (!this.isEmpty() && this.differentSizes() &&
          !this.entryExists(this.desiredShoeSize) &&
          !this.oppositesExist(this.desiredShoeSize) &&
          !this.filteredExist(this.desiredShoeSize)) {
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
            });
      });
  }

  entryExists(out_size) {
    for (let size of this.filtered_list) {
        if (size.out === out_size) {
            return true;
        }
    } return false;
  }

  async compareInAndOut(in_size) {
    await this.swaps.forEach(val => {
      if (val.in === in_size) {
        this.filtered_list.push(val);
      }
      else if (val.out === in_size) {
          this.opposites_list.push(val);
      }
    });
    console.log(this.filtered_list);
    console.log(this.opposites_list);
  }

  filteredExist(in_size) {
    for (let size of this.filtered_list) {
        console.log(size);
        if (size.out === in_size) {
            alert ('Error: opposite entry detected');
            return true;
        }
    }
    return false;
  }

  oppositesExist(out_size) {
    for (let size of this.opposites_list) {
        console.log(size);
        if (size.in === out_size) {
            alert ('Error: opposite entry detected');
            return true;
        }
    }
    return false;
  }

  differentSizes() {
      return this.desiredShoeSize !== this.tradeShoeSize;
  }

  isEmpty() {
      return this.desiredShoeSize === '' || this.tradeShoeSize === '';
  }
}
