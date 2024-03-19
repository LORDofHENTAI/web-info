export class GetFilterExcelModel {
    constructor(
        public filters: string[],
        public articleColumn: number,
        public dayCountColumn: number,
        public providerColumn: number,
        public classColumn: number,
        public fileName: string,
        public token: string,
        public docId: number,
        public storeLoc: string
    ) { }
}