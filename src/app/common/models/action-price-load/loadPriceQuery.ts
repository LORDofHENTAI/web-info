export class LoadPriceQuery {
    constructor(
        public token: string,
        public file: File,
        public loadType: string,
        public storeLock: string,
        public priceType: string
    ) { }


}