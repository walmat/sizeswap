import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import {IProduct} from 'shared/models/product';
import {ProductService} from 'shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {IAppUser} from 'shared/models/app-user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  products: IProduct[] = [];
  appUser: IAppUser = {} as IAppUser;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService) { }

  async ngOnInit() {
    await this.auth.appUser$.subscribe(user => this.appUser = user);
    // this.order$ = await this.auth.user$
    //   .switchMap(user => this.orderService.getPendingSwapsForUser(user.uid));
    await this.populateProducts();

  }

  private populateProducts() {
    this.productService.getAll()
        .switchMap(products => {
            this.products = products;
            return this.route.queryParamMap;
        })
        .subscribe(params => {
        });
  }

}
