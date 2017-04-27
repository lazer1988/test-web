import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Discount } from '../models/discount.model';
import { Voucher } from '../models/voucher.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class VoucherService{
    protected apiUrl: string;

    public discounts: Discount[] = [];
    public vouchers: Voucher[] = [];

    constructor(protected http:Http){
        this.apiUrl = environment.apiUrl;
    }

    /**
     * load discounts
     * @returns {Observable<R|T>}
     */
    getDiscounts(): Observable<Discount[]> {
        return this.http.get(this.apiUrl+'discounts')
            .map(res => res.json().discounts)
            .catch(this.handleError);
    }

    /**
     * load vouchers
     * @returns {Observable<R|T>}
     */
    getVouchers(): Observable<Voucher[]> {
        return this.http.get(this.apiUrl+'vouchers')
            .map(res => res.json().vouchers)
            .catch(this.handleError);
    }

    /**
     * search voucher from vouchers array
     * @param voucher_id
     * @returns {any}
     */
    getVoucherFromList(voucher_id: number): Voucher{
        if(this.vouchers.length == 0){
            return null;
        }

        for(let voucher of this.vouchers){
            if(voucher_id == voucher.id){
                return voucher;
            }
        }

        return null;
    }

    /**
     * add voucher to vouchers array
     * @param voucher
     */
    addVoucher(voucher: Voucher){
        this.vouchers.push(voucher);
    }

    /**
     * make request to create voucher
     * @param voucher
     * @returns {Observable<R|T>}
     */
    createVoucher(voucher: Voucher): Observable<Voucher> {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        let data = new URLSearchParams();
        data.append('discount_id', voucher.discount_id.toString());
        data.append('name', voucher.name);
        data.append('start_date', voucher.start_date);
        data.append('end_date', voucher.end_date);

        return this.http.post(this.apiUrl+'voucher',data.toString(),options)
            .map(res => res.json().voucher)
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}