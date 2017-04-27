import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';

import { appRoutes } from './app.routes';

import { ProductService } from './services/product.service';
import { VoucherService } from './services/voucher.service';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { VoucherFormComponent } from './voucher-form/voucher-form.component';
import { PageNotFoundComponent } from './404/404.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    ProductFormComponent,
    VoucherFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductService, VoucherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
