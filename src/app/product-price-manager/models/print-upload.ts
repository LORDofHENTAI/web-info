export class PrintUpload {
    constructor(
        public token: string,
        public file: File,
        public priceFromFile: boolean,
        public filterCategory: string,
        public filterFormat: string,
        public shop: string,
        public priceType: string
    ) { }
}