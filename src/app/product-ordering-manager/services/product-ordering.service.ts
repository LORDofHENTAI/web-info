import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/common/models/status';
import { AddToVipiska } from 'src/app/price-manager/models/add-to-vipiska';
import { VipiskaDelete } from 'src/app/price-manager/models/vipiska-delete';
import { VipiskaEdit } from 'src/app/price-manager/models/vipiska-edit';
import { VipiskaEnd } from 'src/app/price-manager/models/vipiska-end';
import { VipiskaQuery } from 'src/app/price-manager/models/vipiska-query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderingService {

  // private urlPice = environment.apiUrlPayment + "check/price/";
  private urlAddV = environment.apiUrlPayment + "check/price/add/";
  private urlGetV = environment.apiUrlPayment + "check/price/vipiska/";
  private urlClear = environment.apiUrlPayment + "check/price/clear/";
  private urlDelete = environment.apiUrlPayment + "check/price/delete/";
  private urlEdit = environment.apiUrlPayment + "check/price/edit/";

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