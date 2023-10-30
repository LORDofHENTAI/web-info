export class ProductToCassaModel {
    constructor(
        public token: string,
        public worker: string,
        public store: string,
        public priceType: string
    ) { }
}