import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetPitsModel } from '../models/get-pits.model'
import { Observable } from 'rxjs';
import { Pits } from '../models/pits.model'
import { CreatePits } from '../models/create-pits.model'
import { StatusMsg } from 'src/app/product-ordering-manager/models/status-mas';
import { GetPitsItems } from '../models/get-pits-items.model'
import { PitsList } from '../models/pits-list.model'
import { UpdatePits } from '../models/update-pits.model'
import { AddPitsItem } from '../models/add-pits.model'
import { DeletePitsItem } from '../models/delete-pits-item.model'
import { PitsItemSuply } from '../models/pits-item-suply.model'
import { ImportPitsModel } from '../models/import-pits.model'
@Injectable({
    providedIn: 'root'
})
export class PitsService {
    constructor(
        private http: HttpClient
    ) { }

    getPitsURL = environment.apiUrl + 'GetPits'
    createNewDocumentURL = environment.apiUrl + 'CreateNewDocument'
    getPitsItemsURL = environment.apiUrl + 'GetPitsItems'
    updatePitsItemsURL = environment.apiUrl + 'UpdatePitsItems'
    addPitesItemURL = environment.apiUrl + 'AddPitsItem'
    sendDocURL = environment.apiUrl + 'SendDoc'
    deletePitsItemURL = environment.apiUrl + 'DeletePitsItem'
    deleteAllPitsItemsURL = environment.apiUrl + 'DeleteAllPitsItems'
    docOrderedURL = environment.apiUrl + 'DocOrdered'
    pitsItemSuplyURL = environment.apiUrl + 'PitsItemSuply'
    importFromDatURL = environment.apiUrl + 'ImportFromDat'

    GetPits(data: GetPitsModel): Observable<Pits[]> {
        return this.http.post<Pits[]>(this.getPitsURL, data)
    }
    CreateNewDocument(data: CreatePits): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.createNewDocumentURL, data)
    }
    GetPitsItems(data: GetPitsItems): Observable<PitsList[]> {
        return this.http.post<PitsList[]>(this.getPitsItemsURL, data)
    }
    UpdatePitsItems(data: UpdatePits): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.updatePitsItemsURL, data)
    }
    AddPitsItem(data: AddPitsItem): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.addPitesItemURL, data)
    }
    SendDoc(data: GetPitsItems): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.sendDocURL, data)
    }
    DeletePitsItem(data: DeletePitsItem): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.deletePitsItemURL, data)
    }
    DeleteAllPitsItems(data: DeletePitsItem): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.deleteAllPitsItemsURL, data)
    }
    DocOrdered(data: GetPitsItems): Observable<StatusMsg> {
        return this.http.post<StatusMsg>(this.docOrderedURL, data)
    }
    PitsItemSuply(data: PitsItemSuply): Observable<StatusMsg> {
        console.log(data);

        return this.http.post<StatusMsg>(this.pitsItemSuplyURL, data)
    }
    ImportFromDat(data: ImportPitsModel): Observable<StatusMsg> {
        let input = new FormData();
        input.append("token", data.token)
        input.append("docId", data.docId)
        input.append("storeLoc", data.storeLoc)
        input.append("file", data.file)
        return this.http.post<StatusMsg>(this.importFromDatURL, input)
    }
}
