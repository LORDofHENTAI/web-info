import { PitsList } from "./pits-list.model";
export class UpdatePits {
    constructor(
        public token: string,
        public Pits: PitsList[]
    ) { }
}