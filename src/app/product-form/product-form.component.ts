import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { VoucherService } from '../services/voucher.service';
import { Product } from '../models/product.model';
import { Voucher } from '../models/voucher.model';

@Component({
    moduleId: module.id,
    selector: 'product-form',
    templateUrl: 'product-form.component.html'
})
export class ProductFormComponent implements OnInit{
    title = 'create new product';
    product_name: string;
    product_price: number;

    vouchers: Voucher[] = [];

    constructor(public productService: ProductService, public voucherService: VoucherService){}

    /**
     * load vouchers
     */
    ngOnInit(){
        this.voucherService.getVouchers()
            .subscribe(vouchers => this.voucherService.vouchers = vouchers);
    }

    /**
     * add voucher to list
     * @param voucher_id
     */
    onAddVoucher(voucher_id){
        let voucher = this.voucherService.getVoucherFromList(voucher_id);
        if(voucher && this.vouchers.indexOf(voucher) == -1){
            this.vouchers.push(voucher);
        }
    }

    /**
     * remove voucher from list
     * @param voucher
     */
    onDelVoucher(voucher: Voucher){
        let index = this.vouchers.indexOf(voucher);
        this.vouchers.splice(index,1);
    }

    /**
     * send form
     */
    onSubmit(){
        let product = new Product(null,this.product_name,this.product_price);
        product.addVouchers(this.vouchers);

        this.vouchers = [];

        var productService = this.productService;

        this.productService.createProduct(product).subscribe(function(res){
            if(res.success){
                productService.addProduct(res.product);
            }else{
                productService.showErrors(res.errors);
            }
        });
    }
}
