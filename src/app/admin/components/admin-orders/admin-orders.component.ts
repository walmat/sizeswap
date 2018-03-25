import { Observable } from 'rxjs/Observable';
import { AdminOrders } from 'app/admin/services/admin-orders.service';
import { Component, OnInit } from '@angular/core';
import {DataTableResource} from 'angular-4-data-table';
import { IOrder } from 'shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [AdminOrders]
})
export class AdminOrdersComponent implements OnInit {

  order$: Observable<any[]>;
  orderSubscription: any;
  orderList: IOrder[];
  itemsCount: number = 0;

  tableResource: DataTableResource<IOrder>;
  constructor(private adminOrders: AdminOrders) { }

  ngOnInit() {
    this.orderSubscription = this.adminOrders.getAll()
    .subscribe(orders => {
      this.orderList = orders;
      this.initializeDataTable(orders);
      console.log(orders);
    });
  }

  private initializeDataTable(orders: IOrder[]){
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({ offset: 0 }).then(item => this.orderList = item);
    this.tableResource.count().then(count => this.itemsCount = count);
  }


}
