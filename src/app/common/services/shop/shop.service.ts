import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreList } from '../../models/store-list'
import { PriceTypeList } from '../../models/price-type-list'
import { DepartmentList } from '../../models/departmens';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private urlShop = environment.apiUrl + 'wms/store/list/';
  private urlType = environment.apiUrl + 'wms/store/price/';
  private urlGetDepartment = environment.apiUrl + 'wms/store/department/'; //! delete

  constructor(private http: HttpClient) { }

  getShops(): Observable<StoreList[]> {
    return this.http.get<StoreList[]>(`${this.urlShop}`);
  }

  getTypes(): Observable<PriceTypeList[]> {  //! delete
    return this.http.get<PriceTypeList[]>(`${this.urlType}`);
  }

  getDepartmentList(): Observable<DepartmentList[]> {
    return this.http.get<DepartmentList[]>(`${this.urlGetDepartment}`);
  }
}