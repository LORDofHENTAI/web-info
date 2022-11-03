export class ProductGoods {
    constructor(
        public id: string,
        public storeName: string,
        public stock: string,
        public reserve: string,
        public onWay: string,
        public supply: string,
        public losses: string,
        public implementation: string[],
        public balance: string,
    ) { }
}