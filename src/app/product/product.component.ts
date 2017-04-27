import { Component, Input } from '@angular/core';

import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    @Input() product: Product;

    constructor(public productService: ProductService){}

    /**
     * Buy product and refresh the product list
     */
    buy(){
        this.productService.buyProduct(this.product)
            .subscribe(res => {
                this.product.is_bought = res.success;
                this.productService.getProducts();
            });
    }
}
