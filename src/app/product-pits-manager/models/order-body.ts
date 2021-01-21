export class OrderBody{
    constructor(
        public id: number,
        public docId: number,
        public group: string,
        public article: string,
        public barcode: string,
        public name: string,
        public supplier: string,
        public goods: string,
        public average: string,
        public stockDay : string,
        public deliveryDate: Date,
        public managerСomment: string,
        public departmentComment: string,
    ){}
}