export class PitsList {
    constructor(
        public id: number,
        public docId: number,
        public group: string,
        public article: string,
        public barcode: string,
        public name: string,
        public provider?: string,
        public goods?: number,
        public daylySails?: number,
        public supplyDate?: string,
        public comment?: string,
        public note?: string,
        public status?: string
    ) { }
}