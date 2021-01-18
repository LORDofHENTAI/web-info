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

  constructor(private http: HttpClient) { }

  getListPrices(data: PrintQuery): Observable<Print[]> {
    return this.http.post<Print[]>(`${this.urlGet}`, data);
  }
  
  addPrice(data: AddToPrint): Observable<Status> {
    return this.http.post<Status>(`${this.urlAdd}`, data);
  }

  clearList(data: PrintQuery): Observable<Status> {
    return this.http.post<Status>(`${this.urlClear}`, data);
  }

  deleteItem(data: PrintDelete): Observable<Status> {
    return this.http.post<Status>(`${this.urlDelete}`, data);
  }
}