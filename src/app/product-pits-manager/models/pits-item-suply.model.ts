export class PitsItemSuply {
    constructor(
        public token: string,
        public docId: number,
        public id: number,
        public suplyDate?: string,
        public provider?: string
    ) { }
}