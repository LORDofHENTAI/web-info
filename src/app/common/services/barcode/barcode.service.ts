import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Barcode } from '../../../product-ordering-manager/models/barcode'

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  private url = environment.apiUrl + "wms/barcode";

  constructor(private http: HttpClient) { }

  getBase64String(data: Barcode): Observable<any> {
    let HTTPOptions:Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
    return this.http.post<any>(this.url, data, HTTPOptions);
  }
}