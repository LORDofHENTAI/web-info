import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/common/models/status';
import { environment } from 'src/environments/environment';
import { Print } from '../models/print'
import { PrintQuery } from '../models/print-query'
import { AddToPrint } from '../models/add-to-print'
import { PrintDelete } from '../models/print-delete'
import { PrintUpload } from '../models/print-upload'

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  private urlAdd = environment.apiUrl + "printlist/add/";
  private urlGet = environment.apiUrl + "printlist/get/";
  private urlClear = environment.apiUrl + "printlist/clear/";
  private urlDelete = environment.apiUrl + "printlist/delete/";
  private urlUploadMile = environment.apiUrl + "printlist/uploadMile/";
  private urlUploadYork = environment.apiUrl + "printlist/uploadYork/";
  private urlUploadDat = environment.apiUrl + "printlist/uploadDat/";

  constructor(private http: HttpClient) { }

  getListPrices(data: PrintQuery): Observable<Print[]> {
    return this.http.post<Print[]>(`${this.urlGet}`, data);
  }

  addPrice(data: AddToPrint): Observable<string> {
    return this.http.post<string>(`${this.urlAdd}`, data);
  }

  clearList(data: PrintQuery): Observable<string> {
    return this.http.post<string>(`${this.urlClear}`, data);
  }

  deleteItem(data: PrintDelete): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlDelete}`, data);
  }

  uploadList(fileToUpload: PrintUpload, type: string): Observable<string> {
    let input = new FormData();
    input.append("token", fileToUpload.token);
    input.append("file", fileToUpload.file);
    input.append("filterCategory", fileToUpload.filterCategory);
    input.append("filterFormat", fileToUpload.filterFormat);
    input.append("priceFromFile", String(fileToUpload.priceFromFile));
    input.append("shop", fileToUpload.shop);
    input.append("priceType", fileToUpload.priceType);
    console.log(fileToUpload);
    // const req = new HttpRequest('POST', `${this.urlUploadMile}`, input, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    // return this.http.request(req);
    if (type === 'mile')
      return this.http.post<string>(`${this.urlUploadMile}`, input,);
    else
      if (type === 'york')
        return this.http.post<string>(`${this.urlUploadYork}`, input);
      else
        if (type === 'dat')
          return this.http.post<string>(`${this.urlUploadDat}`, input);
  }

  uploadMile(file: File, type: string): Observable<HttpEvent<any>> {
    const formaData: FormData = new FormData();
    formaData.append('file', file);
    if (type === 'mile') {
      console.log(type);
      const req = new HttpRequest('POST', `${this.urlUploadMile}`, formaData, {
        reportProgress: true,
        responseType: 'json'
      });
      return this.http.request(req);
    }
    else
      if (type === 'york') {
        console.log(type);
        const req = new HttpRequest('POST', `${this.urlUploadYork}`, formaData, {
          reportProgress: true,
          responseType: 'json'
        });
        return this.http.request(req);
      }
      else
        if (type === 'dat') {
          console.log(type);
          const req = new HttpRequest('POST', `${this.urlUploadDat}`, formaData, {
            reportProgress: true,
            responseType: 'json'
          });
          return this.http.request(req);
        }
  }

}