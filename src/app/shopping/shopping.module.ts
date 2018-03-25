import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccssComponent } from './components/order-succss/order-succss.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/products/product/product-page/product-page.component';
import {AccountComponent} from './components/account/account.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    { path: 'products', component: ProductsComponent },
    { path: 'products/:title', component: ProductPageComponent},
    { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
    { path: 'order-success/:id', component: OrderSuccssComponent, canActivate: [AuthGuardService] },
  ])
  ],
  declarations: [
    ProductsComponent,
    OrderSuccssComponent,
    MyOrdersComponent,
    ProductPageComponent,
    AccountComponent
  ]
})
export class ShoppingModule { }
