import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {IProduct} from 'shared/models/product';
import {Order} from 'shared/models/order';
import {OrderService} from 'shared/services/order.service';
import {IAppUser} from 'shared/models/app-user';
import {AuthService} from 'shared/services/auth.service';

@Component({
    selector: 'app-order-card',
    templateUrl: './order-card.component.html',
    styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

    @Input('product') product: IProduct;
    @Input('width') width;

    appUser: IAppUser = {} as IAppUser;
    pending_orders: any[] = [];

    constructor(
        private route: Router,
        private orderService: OrderService,
        private auth: AuthService
    ) { }

    async ngOnInit() {
        await this.auth.appUser$.subscribe(user => this.appUser = user);
        await this.orderService.getAllPendingSwaps().subscribe(ref => {
            ref.map(v => {
                if (v.buyerId === this.appUser.ID || v.requesterId === this.appUser.ID) {
                    this.pending_orders.push(v);
                }
            });
        });
        console.log(this.pending_orders);
    }

}
