export class FindOrder{
    constructor(
        public token: string,
        public foundByStatusId: number,
        public foundByDeparmentId: number,
        public foundByStoreId: number,
        public fromDate: string,
        public toDate: string,
    ){}
}