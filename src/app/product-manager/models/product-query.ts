export class ProductQuery{
    constructor(
        public token: string,
        public isExcluded: boolean,
        public group: string,
        public article: string,
        public name: string,
        public barcode: string,
        public storeType: string,
        public priceType: string,
        public current: string,
    ){}
}