export class OrderBody{
    constructor(
        public checked: boolean = false,
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
        public deliveryDate: string,
        public managerСomment: string,
        public departmentComment: string,
    ){}
}