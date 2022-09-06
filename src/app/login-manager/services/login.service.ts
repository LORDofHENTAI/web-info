import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { Logout } from '../models/logout';
import { LogoutStatus } from '../models/logout-status';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.apiUrl + 'auth/?data';
  private urlLogout = environment.apiUrl + 'logout/';

  constructor(private http: HttpClient) { }

  getLogin(login: LoginQuery): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlLogin}`, login);
  }

  postLogout(login: Logout): Observable<string> {
    return this.http.post<string>(`${this.urlLogout}`, login);
  }
}
