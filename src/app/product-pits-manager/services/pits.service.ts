import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../models/order-status'
import { DepartmentList } from '../../common/models/departmens'
import { FindOrder } from '../models/find-order'
import { Order } from '../models/order'
import { AddOrder } from '../models/add-order'
 
@Injectable({
  providedIn: 'root'
})
export class PitsService {

  private urlGetOrderStatus = environment.apiUrl + "orders/status/list/";
  private urlGetOrders = environment.apiUrl + "orders/find/";
  private urlAddOrder = environment.apiUrl + "orders/new/";

  constructor(private http: HttpClient) { }

  getOrderStatus(): Observable<OrderStatus[]> {
    return this.http.post<OrderStatus[]>(`${this.urlGetOrderStatus}`, '');
  }

  getOrderList(data: FindOrder): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.urlGetOrders}`, data);
  }

  addOrder(data: AddOrder): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.urlAddOrder}`, data);
  }
}
