import {Voucher} from "./voucher.model";

/**
 * Product model
 */
export class Product{
    public vouchers: Voucher[] = [];

    constructor(
        public id: number = null,
        public name: string,
        public price: number,
        public is_bought: boolean = false,
        public discount_price: number = 0,
        public discount: number = 0
    ){}

    /**
     * add voucher to the list
     * @param voucher
     */
    addVoucher(voucher: Voucher){
        if(voucher && this.vouchers.indexOf(voucher) == -1){
            this.vouchers.push(voucher);
        }
    }

    /**
     * add array of vouchers to the list
     * @param vouchers
     * @returns {boolean}
     */
    addVouchers(vouchers: Voucher[]): boolean{
        if(vouchers.length == 0){
            return false;
        }

        for(let voucher of vouchers){
            this.addVoucher(voucher);
        }

        return true;
    }
}