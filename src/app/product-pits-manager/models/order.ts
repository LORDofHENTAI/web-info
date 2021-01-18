export class Order{
    constructor(
        public id: number,
        public creationDate: Date,
        public statusId: number,
        public deparmentId: number,
        public storeId: number,
        public author: string,
    ){}
}