import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService{
    protected apiUrl: string;

    products: Product[] = [];

    constructor(protected http:Http, ){
        this.apiUrl = environment.apiUrl;
    }

    /**
     * add product to the list
     * @param product
     */
    addProduct(product: Product){
        this.products.push(product);
    }

    /**
     * get products from database
     * @param sort
     */
    getProducts(sort: string = 'ASC'){
        this.http.get(this.apiUrl+'products?sort='+sort)
            .map(res => res.json().products)
            .catch(this.handleError)
            .subscribe(products => this.products = products);
    }

    /**
     * make request to create new product
     * @param product
     * @returns {Observable<R|T>}
     */
    createProduct(product: Product): Observable<any> {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        let data = new URLSearchParams();
        data.append('name', product.name);
        data.append('price', product.price.toString());

        // append vouchers ids to params
        if(product.vouchers.length){
            for(let voucher of product.vouchers){
                data.append('vouchers[]', voucher.id.toString());
            }
        }

        return this.http.post(this.apiUrl+'product',data.toString(),options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // but product
    buyProduct(product: Product){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        let data = new URLSearchParams();
        data.append('id', product.id.toString());

        return this.http.post(this.apiUrl+'product/buy', data.toString(), options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * show errors
     * @param errors
     */
    showErrors(errors: string[]){
        let mess = '';
        for(let error of errors){
            mess += error+"\n";
        }

        alert(mess);
    }

    private handleError(error: any){
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}