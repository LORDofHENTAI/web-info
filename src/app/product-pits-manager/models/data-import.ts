import { DatArh } from '../models/dat-arh'

export class DatImport{
    constructor(
        public token: string,
        public docId: number,
        public storeId: number,
        public products: DatArh[],
    ){}
}