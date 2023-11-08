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
import { ProductToCassaModel } from '../models/product-to-cassa-model'
import { StatusMsg } from '../models/status-mas'
@Injectable({
  providedIn: 'root'
})
export class ProductOrderingService {

  private urlAdd = environment.apiUrl + "productlist/add";
  private urlGet = environment.apiUrl + "productlist/get/";
  private urlClear = environment.apiUrl + "productlist/clear/";
  private urlDelete = environment.apiUrl + "productlist/delete/";
  private urlEdit = environment.apiUrl + "productlist/edit/";
  private urlUserCheck = environment.apiUrl + "productlist/user/check"
  private ulrToCassa = environment.apiUrl + 'productlist/tocassa'
  constructor(private http: HttpClient) { }

  getListVipiska(data: VipiskaQuery): Observable<VipiskaEnd> {
    console.log(data);
    return this.http.post<VipiskaEnd>(`${this.urlGet}`, data);
  }

  addToVipiska(data: AddToVipiska): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlAdd}`, data);
  }

  clearList(data: VipiskaQuery): Observable<string> {
    return this.http.post<string>(`${this.urlClear}`, data);
  }

  deleteItem(data: VipiskaDelete): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlDelete}`, data);
  }

  editItem(data: VipiskaEdit): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlEdit}`, data);
  }
  // orderToCassa(data: ProductToCassaModel): Observable<StatusMsg> {
  //   return this.http.post<StatusMsg>(`${this.ulrToCassa}`, data)
  // }
}