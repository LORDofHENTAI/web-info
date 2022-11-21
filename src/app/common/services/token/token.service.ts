import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { CookieLogin } from 'src/app/login-manager/models/cookie-login';
import { LoginResponse } from 'src/app/login-manager/models/login-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  cookieName = environment.cookieName;

  public _subject = new Subject<any>();

  constructor(
    private cookieService: CookieService,
  ) { }

  logEvent(event) {
    this._subject.next(event);
  }

  get events$() {
    return this._subject.asObservable();
  }

  getToken(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.token;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getLogin(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.login;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getShop(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.shopId;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getType(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.typeId;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getDepartment(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.departmentId;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getIsAdmin(): string {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          if (loginFromCookie.adminCount)
            return loginFromCookie.adminCount;
          else return '0';
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getGroup() {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie.title;
        }
      }
      else return '';
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  getCookie(): CookieLogin {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie) {
          return loginFromCookie;
        }
      }
      else return null;
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  deleteCookie() {
    if (this.cookieService.check(this.cookieName)) {
      let cookie = this.getCookie();
      this.cookieService.delete(this.cookieName);
      this.setCookie(CookieLogin.setCookieLogin(cookie.shopId, cookie.typeId, cookie.departmentId, new LoginResponse('', '', '', '', '', '')));
    }
  }

  isLoginUser(): boolean {
    try {
      if (this.cookieService.check(this.cookieName)) {
        let fullData = this.cookieService.get(this.cookieName);
        let loginFromCookie = JSON.parse(fullData);
        if (loginFromCookie.token) {
          return true;
        }
      }
      else return false;
    }
    catch (error) {
      console.error();
      alert('login error')
    }
  }

  setCookie(login: CookieLogin) {
    let loginJson = JSON.stringify(login);
    this.cookieService.set(this.cookieName, loginJson, 365);
  }
}