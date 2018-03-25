import { Observable } from 'rxjs/Observable';
import { AdminOrders } from 'app/admin/services/admin-orders.service';
import { Component, OnInit } from '@angular/core';
import {DataTableResource} from 'angular-4-data-table';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [AdminOrders]
})
export class AdminOrdersComponent implements OnInit {

  order$: Observable<any[]>;
  orderSubscription: any;
  orderList: any[];
  constructor(private adminOrders: AdminOrders) { }

  ngOnInit() {
    this.orderSubscription = this.adminOrders.getAll()
    .subscribe(orders => {
      this.orderList = orders;
      this.initializeDataTable(orders);
      console.log(orders);
    });
  }

  private initializeDataTable(orders){

  }


}
