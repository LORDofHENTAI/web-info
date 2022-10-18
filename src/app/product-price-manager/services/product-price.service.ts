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
import { PriceFormat } from '../models/price-settings-models/price-format'
import { GetPriceTemp } from '../models/price-settings-models/get-price-temp'
import { AddPriceFormat } from '../models/price-settings-models/add-price-format'
import { DeletePriceTemp } from '../models/price-settings-models/delete-price-temp'
import { PriceStyle } from '../models/price-settings-models/price-style'
import { AddPriceStyle } from '../models/price-settings-models/add-price-style'
import { FindStyle } from '../models/price-settings-models/find-price-style'
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
  private urlGetPriceFormat = environment.apiUrl + "printlist/getPriceFormat/";
  private urlAddPriceFormat = environment.apiUrl + "printlist/addPriceFormat/";
  private urlDeletePriceFormat = environment.apiUrl + "printlist/deletePriceFormat/";
  private urlGetPriceStyle = environment.apiUrl + "printlist/getPriceStyle/";
  private urlAddPriceStyle = environment.apiUrl + "printlist/addPriceStyle/";
  private urlDeletePriceStyle = environment.apiUrl + "printlist/deletePriceStyle/";
  private urlStyleByFormat = environment.apiUrl + "printlist/findIdFormat/";


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
    console.log(fileToUpload);
    let input = new FormData();
    input.append("token", fileToUpload.token);
    input.append("file", fileToUpload.file);
    input.append("filterCategory", fileToUpload.filterCategory);
    input.append("filterFormat", fileToUpload.filterFormat);
    input.append("priceFromFile", String(fileToUpload.priceFromFile));
    input.append("shop", fileToUpload.shop);
    input.append("priceType", fileToUpload.priceType);
    console.log(fileToUpload);
    if (type === 'mile')
      return this.http.post<string>(`${this.urlUploadMile}`, input);
    else
      if (type === 'york') {
        return this.http.post<string>(`${this.urlUploadYork}`, input);
      }
      else
        if (type === 'dat')
          return this.http.post<string>(`${this.urlUploadDat}`, input);
  }

  getPriceFormat(data: GetPriceTemp): Observable<PriceFormat> {
    console.log(data);
    return this.http.post<PriceFormat>(`${this.urlGetPriceFormat}`, data);
  }

  addPriceFormat(data: AddPriceFormat): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlAddPriceFormat}`, data);
  }

  deletePriceFormat(data: DeletePriceTemp): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlDeletePriceFormat}`, data);
  }

  getPriceStyle(data: GetPriceTemp): Observable<PriceStyle> {
    console.log(data);
    return this.http.post<PriceStyle>(`${this.urlGetPriceStyle}`, data);
  }

  addPriceStyle(data: AddPriceStyle): Observable<string> {
    console.log(data);
    let input = new FormData();
    input.append("token", data.token);
    input.append("file", data.file);
    input.append("idFormat", String(data.idFormat));
    input.append("styleName", data.styleName);
    return this.http.post<string>(`${this.urlAddPriceStyle}`, input);
  }

  deletePriceStyle(data: DeletePriceTemp): Observable<string> {
    console.log(data);
    return this.http.post<string>(`${this.urlDeletePriceStyle}`, data);
  }

  findStyleById(data: FindStyle): Observable<PriceStyle> {
    return this.http.post<PriceStyle>(`${this.urlStyleByFormat}`, data);
  }


}