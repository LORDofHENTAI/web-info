export class FindOrder{
    constructor(
        public token: string,
        public foundByStatusId: number,
        public foundByDepartmentId: number,
        public foundByStoreId: number,
        public fromDate: string,
        public toDate: string,
    ){}
}