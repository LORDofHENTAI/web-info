export class GetFiltredPrintListModel {
    constructor(
        public categories: string[],
        public formats: string[],
        public token: string,
        public section: string[],
        public fileName: string,
        public articleColumn: number,
        public sectionColumn: number,
        public actionPriceColumn: number,
        public oldPriceColumn: number,
        public percentColumn: number,
        public actionMetrPriceColumn: number,
        public oldMetrPriceColumn: number,
        public formatPriceColumn: number,
        public categoryColumn: number,
        public nameColumn: number,
        public PriceFromFile: string,
        public ActionDate: string,
        public MaxPercent: string,
        public Shop: string,
        public PriceType: string
    ) { }
}