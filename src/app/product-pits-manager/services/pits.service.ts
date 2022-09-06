import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../models/order-status'
import { FindOrder } from '../models/find-order'
import { Order } from '../models/order'
import { AddOrder } from '../models/add-order'
import { ViewOrder } from '../models/view-order'
import { OrderBody } from '../models/order-body'
import { ProductAdd } from '../models/product-add'
import { ProductDelete } from '../models/product-delete'
import { Status } from 'src/app/common/models/status';
import { ProductClear } from '../models/product-clear'
import { SaveOrderBody } from '../models/save-order-body'
import { DatImport } from '../models/data-import'

@Injectable({
  providedIn: 'root'
})
export class PitsService {

  private urlGetOrderStatus = environment.apiUrl + "orders/status/list/";
  private urlGetOrders = environment.apiUrl + "orders/find/";
  private urlAddOrder = environment.apiUrl + "orders/new/";
  private urlOrder = environment.apiUrl + "orders/view/";
  private urlProductToOrder = environment.apiUrl + "orders/product/add/";
  private urlProductDelete = environment.apiUrl + "orders/product/delete/";
  private urlOrderClear = environment.apiUrl + "orders/product/clear/";
  private urlOrderSave = environment.apiUrl + "orders/product/save/";
  private urlProductImport = environment.apiUrl + "orders/product/import";

  constructor(private http: HttpClient) { }

  getOrderStatus(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${this.urlGetOrderStatus}`);
  }

  getOrderList(data: FindOrder): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.urlGetOrders}`, data);
  }

  addOrder(data: AddOrder): Observable<Order> {
    return this.http.post<Order>(`${this.urlAddOrder}`, data);
  }

  getOrder(data: ViewOrder): Observable<OrderBody[]> {
    return this.http.post<OrderBody[]>(`${this.urlOrder}`, data);
  }

  putProductToOrder(data: ProductAdd): Observable<OrderBody> {
    return this.http.post<OrderBody>(`${this.urlProductToOrder}`, data);
  }

  deleteProductFromOrder(data: ProductDelete): Observable<Status> {
    return this.http.post<Status>(`${this.urlProductDelete}`, data);
  }

  clearOrder(data: ProductClear): Observable<Status> {
    return this.http.post<Status>(`${this.urlOrderClear}`, data);
  }

  saveOrder(data: SaveOrderBody): Observable<Order> {
    return this.http.post<Order>(`${this.urlOrderSave}`, data);
  }

  postDataImport(data: DatImport): Observable<any> {
    return this.http.post<any>(this.urlProductImport, data);
  }
}
