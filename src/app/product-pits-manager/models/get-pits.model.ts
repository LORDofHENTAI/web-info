export class GetPitsModel {
    constructor(
        public token: string,
        public startDate?: string,
        public endDate?: string,
        public department?: string,
        public docStatus?: string,
        public store?: string
    ) { }
}