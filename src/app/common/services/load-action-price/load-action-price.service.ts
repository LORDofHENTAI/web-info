import { Injectable } from '@angular/core';
import { GetLoadPrice } from '../../models/action-price-load/getLoadPrice';
import { LoadPriceAnswer } from '../../models/action-price-load/loadPriceAnswer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Status } from '../../models/status';
import { LoadPriceQuery } from '../../models/action-price-load/loadPriceQuery'

@Injectable({
  providedIn: 'root'
})
export class LoadActionPriceService {

  constructor(private http: HttpClient) { }

  private getTempActionPriceTable = environment.apiUrl + 'loadaction/getTemp/';
  private getActionPriceTable = environment.apiUrl + 'loadaction/get/';
  private loadTempActionPrice = environment.apiUrl + 'loadaction/addTemp/';
  private loadActionPrice = environment.apiUrl + 'loadaction/load/';
  private clearActionTempTable = environment.apiUrl + 'loadaction/deleteTemp/';
  private clearActionTable = environment.apiUrl + 'loadaction/delete/';


  getTempActonTable(data: GetLoadPrice): Observable<LoadPriceAnswer> {
    return this.http.post<LoadPriceAnswer>(`${this.getTempActionPriceTable}`, data)
  }

  getActionTable(data: GetLoadPrice): Observable<LoadPriceAnswer> {
    return this.http.post<LoadPriceAnswer>(`${this.getActionPriceTable}`, data)
  }
  clearTempTable(data: GetLoadPrice): Observable<string> {
    return this.http.post<string>(`${this.clearActionTempTable}`, data)
  }
  clearTable(data: GetLoadPrice): Observable<string> {
    return this.http.post<string>(`${this.clearActionTable}`, data)
  }

  loadTempAction(data: LoadPriceQuery): Observable<string> {
    console.log('>>>>>>' + data);
    let input = new FormData();
    input.append("token", data.token);
    input.append("file", data.file);
    input.append("loadType", data.loadType);
    input.append("storeLock", data.storeLock);
    input.append("priceType", data.priceType);
    return this.http.post<string>(`${this.loadTempActionPrice}`, input);
  }

  loadAction(data: GetLoadPrice): Observable<string> {
    return this.http.post<string>(`${this.loadActionPrice}`, data)
  }

}
