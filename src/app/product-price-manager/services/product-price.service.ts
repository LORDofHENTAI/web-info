import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/common/models/status';
import { environment } from 'src/environments/environment';
import { Print } from '../models/print'
import { PrintQuery } from '../models/print-query'
import { AddToPrint } from '../models/add-to-print'
import { PrintDelete } from '../models/print-delete'

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  private urlAdd = environment.apiUrl + "printlist/add/";
  private urlGet = environment.apiUrl + "printlist/get/";
  private urlClear = environment.apiUrl + "printlist/clear/";
  private urlDelete = environment.apiUrl + "printlist/delete/";
  private urlUpload = environment.apiUrl + "printlist/upload/";

  constructor(private http: HttpClient) { }

  getListPrices(data: PrintQuery): Observable<Print[]> {
    return this.http.post<Print[]>(`${this.urlGet}`, data);
  }

  addPrice(data: AddToPrint): Observable<string> {
    return this.http.post<string>(`${this.urlAdd}`, data);
  }

  clearList(data: PrintQuery): Observable<string> {
    return this.http.post<string>(`${this.urlClear}`, data);
  }

  deleteItem(data: PrintDelete): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlDelete}`, data);
  }

  uploadList(fileToUpload: File) {
    let input = new FormData();
    input.append("file", fileToUpload)
    console.log(fileToUpload.name, fileToUpload.size)
    return this.http.post(this.urlUpload, input);
  }
}