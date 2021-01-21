export class ProductAdd{
    constructor(
        public token: string,
        public article: string,
        public storeId: number,
        public docId: number,
    ){}
}