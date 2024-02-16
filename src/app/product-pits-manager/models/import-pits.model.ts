export class ImportPitsModel {
    constructor(
        public token: string,
        public docId: string,
        public storeLoc: string,
        public file: File
    ) { }
}