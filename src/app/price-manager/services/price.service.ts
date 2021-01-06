import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckModel } from '../models/check-model';
import { CheckAnswer } from '../models/check-answer';
import { AddToVipiska } from '../models/add-to-vipiska';
import { VipiskaQuery } from '../models/vipiska-query';
import { VipiskaEnd } from '../models/vipiska-end';
import { VipiskaDelete } from '../models/vipiska-delete';
import { VipiskaEdit } from '../models/vipiska-edit';
import { Status } from 'src/app/common/models/status';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private urlPice = environment.apiUrlPayment + "check/price/";
  private urlAddV = environment.apiUrlPayment + "check/price/add/";
  private urlGetV = environment.apiUrlPayment + "check/price/vipiska/";
  private urlClear = environment.apiUrlPayment + "check/price/clear/";
  private urlDelete = environment.apiUrlPayment + "check/price/delete/";
  private urlEdit = environment.apiUrlPayment + "check/price/edit/";
  
  constructor(private http: HttpClient) { }

  getProduct(data: CheckModel): Observable<any> { // CheckAnswer
    return this.http.post<any>(`${this.urlPice}`, data);
  }

  addToVipiska(data: AddToVipiska): Observable<Status> {
    return this.http.post<Status>(`${this.urlAddV}`, data);
  }

  getListVipiska(data: VipiskaQuery): Observable<VipiskaEnd> {
    return this.http.post<VipiskaEnd>(`${this.urlGetV}`, data);
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
