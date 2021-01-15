import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/common/models/status';
import { AddToVipiska } from 'src/app/product-ordering-manager/models/add-to-vipiska';
import { VipiskaDelete } from 'src/app/product-ordering-manager/models/vipiska-delete';
import { VipiskaEdit } from 'src/app/product-ordering-manager/models/vipiska-edit';
import { VipiskaEnd } from 'src/app/product-ordering-manager/models/vipiska-end';
import { VipiskaQuery } from 'src/app/product-ordering-manager/models/vipiska-query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  // private urlPice = environment.apiUrlPayment + "check/price/";
  private urlAddV = environment.apiUrl + "check/price/add/";
  private urlGetV = environment.apiUrl + "check/price/vipiska/";
  private urlClear = environment.apiUrl + "check/price/clear/";
  private urlDelete = environment.apiUrl + "check/price/delete/";
  private urlEdit = environment.apiUrl + "check/price/edit/";

  constructor(private http: HttpClient) { }

  getListVipiska(data: VipiskaQuery): Observable<VipiskaEnd> {
    return this.http.post<VipiskaEnd>(`${this.urlGetV}`, data);
  }
  
  addToVipiska(data: AddToVipiska): Observable<Status> {
    return this.http.post<Status>(`${this.urlAddV}`, data);
  }

  clearList(data: VipiskaQuery): Observable<Status> {
    return this.http.post<Status>(`${this.urlClear}`, data);
  }

  deleteItem(data: VipiskaDelete): Observable<Status> {
    return this.http.post<Status>(`${this.urlDelete}`, data);
  }

  editItem(data: VipiskaEdit): Observable<Status> {
    return this.http.post<Status>(`${this.urlEdit}`, data);
  }
}