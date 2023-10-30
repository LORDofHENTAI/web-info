import { InfoWorkersModel } from './info-workers-model'
export class NewUserModel {
    constructor(
        public token: string,
        public worker: InfoWorkersModel
    ) { }

}