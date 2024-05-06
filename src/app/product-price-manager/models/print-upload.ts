export class PrintUpload {
    constructor(
        public token: string,
        public file: File,
        public priceFromFile: boolean,
        public shop: string,
        public priceType: string,
        public actionDate?: string,
        public maxPercent?: string
    ) { }
}