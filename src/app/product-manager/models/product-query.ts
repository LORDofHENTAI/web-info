export class ProductQuery{
    constructor(
        public token: string,
        public group: string,
        public article: string,
        public name: string,
        public barcode: string,
        public place: string,
        public dilevery: string,
        public current: string
    ){}
}