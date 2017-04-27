import { Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { VoucherFormComponent } from './voucher-form/voucher-form.component';
import { PageNotFoundComponent } from './404/404.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'create-product',
        component: ProductFormComponent
    },
    {
        path: 'create-voucher',
        component: VoucherFormComponent
    },
    { path: '**', component: PageNotFoundComponent }
];