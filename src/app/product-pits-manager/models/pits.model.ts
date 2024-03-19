export class Pits {
    constructor(
        public id: number,
        public doc_date: Date,
        public department: string,
        public status: string,
        public storeLoc: string,
        public token?: string
    ) { }
}