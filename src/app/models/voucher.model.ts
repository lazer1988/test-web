/**
 * Voucher model
 */
export class Voucher{
    constructor(
        public id: number = null,
        public discount_id: number,
        public name: string,
        public start_date: string,
        public end_date: string,
        public is_active: boolean = true
    ){}
}