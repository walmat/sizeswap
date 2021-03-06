import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-4-data-table';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { ListOrderViewComponent } from './components/list-order-view/list-order-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    ProductCardComponent,
    OrderCardComponent,
    ListOrderViewComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    OrderService
  ],
  exports : [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot().ngModule,
    ProductCardComponent,
    OrderCardComponent,
  ]
})
export class SharedModule { }
