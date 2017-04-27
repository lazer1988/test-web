import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker';

import { Voucher } from '../models/voucher.model';
import { VoucherService } from '../services/voucher.service';

@Component({
    moduleId: module.id,
    selector: 'voucher-form',
    templateUrl: 'voucher-form.component.html'
})
export class VoucherFormComponent implements OnInit{
    title = 'create new voucher';

    voucherName: string;
    discount_id = 0;

    public myDatePickerOptions: IMyOptions = {
        dateFormat: 'yyyy-mm-dd',
    };

    public start_date;
    public end_date;

    constructor(public voucherService: VoucherService){}

    /**
     * load discounts
     */
    ngOnInit(){
        this.voucherService.getDiscounts()
            .subscribe(discounts => this.voucherService.discounts = discounts);
    }

    /**
     * handle submit form
     */
    onSubmit(){
        let voucher = new Voucher(null, this.discount_id, this.voucherName, this.start_date.formatted, this.end_date.formatted);

        this.discount_id = 0;
        this.start_date.date = null;
        this.end_date.date = null;

        this.voucherService.createVoucher(voucher)
            .subscribe(voucher => this.voucherService.addVoucher(voucher));
    }
}
