export class PrintUpload {
    constructor(
        public token: string,
        public file: File,
        public priceFromFile: boolean,
        public selectSection: boolean,
        public sectionName: string,
        public shop: string,
        public priceType: string,
        public actionDate?: string,
        public maxPercent?: string
    ) { }
}