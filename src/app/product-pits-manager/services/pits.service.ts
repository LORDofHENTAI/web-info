import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../models/order-status'
import { FindOrder } from '../models/find-order'
import { Order } from '../models/order'
import { AddOrder } from '../models/add-order'
import { ViewOrder } from '../models/view-order'
import { OrderBody } from '../models/order-body'
import { ProductAdd } from '../models/product-add'
 
@Injectable({
  providedIn: 'root'
})
export class PitsService {

  private urlGetOrderStatus = environment.apiUrl + "orders/status/list/";
  private urlGetOrders = environment.apiUrl + "orders/find/";
  private urlAddOrder = environment.apiUrl + "orders/new/";
  private urlOrder = environment.apiUrl + "orders/view/";
  private urlProductToOrder = environment.apiUrl + "orders/product/add/";

  constructor(private http: HttpClient) { }

  getOrderStatus(): Observable<OrderStatus[]> {
    return this.http.post<OrderStatus[]>(`${this.urlGetOrderStatus}`, '');
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
}
