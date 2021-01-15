export class ProductQuery{
    constructor(
        public token: string,
        public group: string,
        public article: string,
        public name: string,
        public barcode: string,
        public storeType: string,
        public priceType: string,
        // public place: string, //to do delete
        // public dilevery: string,
        public current: string,
    ){}
}