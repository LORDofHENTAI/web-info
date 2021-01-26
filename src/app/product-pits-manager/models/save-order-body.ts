import { OrderBody } from '../models/order-body'

export class SaveOrderBody{
    constructor(
        public token: string,
        public docId: number,
        public body: OrderBody[],
        public statusId: number,
    ){}
}