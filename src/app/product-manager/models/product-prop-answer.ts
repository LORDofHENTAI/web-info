import { ProductGoods } from "./product-goods";
import { ProductAddon } from "./product-addon";

export class ProductPropAnswer{
    constructor(
        public article: string,
        public type: string, 
        public country: string,
        public name: string, 
        public mesabbrev: string,
        public group: string, 
        public delivers: string, 
        public goods: ProductGoods[], 
        public barcode: string[],
        public addon: ProductAddon[], 
    ){}
}