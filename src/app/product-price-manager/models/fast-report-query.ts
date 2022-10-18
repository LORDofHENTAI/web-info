export class FastReportQuery {
    constructor(
        public token: string,
        public name: string,
        public storeLoc: string,
        public priceType: string,
        public actionFlag: number
    ) { }
}