export class PitsLogs {
    constructor(
        public id: number,
        public docid: number,
        public login: string,
        public action: string,
        public actionDate: Date
    ) { }
}