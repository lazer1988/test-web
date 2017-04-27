import { Component, OnInit } from '@angular/core';

import { ProductService } from "../services/product.service";

@Component({
    moduleId: module.id,
    selector: 'product-list',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit{
    title = 'products list';

    private sort: string = 'ASC';

    constructor(public productService: ProductService){

    }

    /**
     * load products
     */
    ngOnInit(){
        this.productService.getProducts();
    }

    /**
     * make soring request
     */
    onSort(){
        this.sort = (this.sort === 'ASC') ? 'DESC' : 'ASC';
        this.productService.getProducts(this.sort);
    }
}
