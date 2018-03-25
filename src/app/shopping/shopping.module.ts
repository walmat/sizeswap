import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccssComponent } from './components/order-succss/order-succss.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ProductPageComponent } from './components/products/product/product-page/product-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    { path: 'cart', component: ShopingCartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:title', component: ProductPageComponent},
    { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
    // { path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuardService] },
    { path: 'order-success/:id', component: OrderSuccssComponent, canActivate: [AuthGuardService] },
    { path: 'order-details/:id', component: OrderViewComponent, canActivate: [AuthGuardService] }
  ])
  ],
  declarations: [
    ProductsComponent,
    OrderSuccssComponent,
    ShopingCartComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    OrderViewComponent,
    ProductPageComponent,
  ]
})
export class ShoppingModule { }
