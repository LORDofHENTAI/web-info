import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/common/services/token/token.service';
import { LoginQuery } from '../models/login-query';
import { LoginService } from '../services/login.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { LoginResponse } from '../models/login-response';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieLogin } from '../models/cookie-login';
import { MatDialog } from '@angular/material/dialog';
import { ShopService } from 'src/app/common/services/shop/shop.service'
import { StoreList } from 'src/app/common/models/store-list';
import { PriceTypeList } from 'src/app/common/models/price-type-list';
import { DepartmentList } from 'src/app/common/models/departmens';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    "userName": new FormControl('', Validators.required),
    "userPassword": new FormControl('', Validators.required),
    "userShop": new FormControl(null, Validators.required),
    // "userType": new FormControl(null, Validators.required),
    "userDepartment": new FormControl(null, Validators.required),
  });
  inputType: string = 'password'
  loginQuery: LoginQuery;
  shops: StoreList[];
  types: PriceTypeList[];
  departments: DepartmentList[];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private shopService: ShopService,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Info');
    this.getShopList();
    this.getTypeList();
    this.getDepartmentsList();
  }

  checkResponse(response: LoginResponse): boolean {
    if (response)
      if (response.token)
        if (response.token.length > 0)
          return true;
  }

  submit() {
    this.loginQuery = new LoginQuery(this.userForm.value.userName, this.userForm.value.userPassword);
    this.loginService.getLogin(this.loginQuery).subscribe(response => {
      if (this.checkResponse(response)) {
        this.tokenService.setCookie(
          CookieLogin.setCookieLogin(String(this.userForm.value.userShop.id), this.userForm.value.userShop.priceType, this.userForm.value.userDepartment, response)
        );
        this.tokenService.logEvent(true);
        this.router.navigate(['/products']);
      }
      else
        this.snackbarService.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  getShopList() {
    this.shopService.getShops().subscribe(response => {
      console.log(response)
      if (response)
        this.shops = response;
    },
      error => {
        console.log(error);
      });
  }

  getTypeList() {
    this.shopService.getTypes().subscribe(response => {
      if (response)
        this.types = response;
    },
      error => {
        console.log(error);
      });
  }

  getDepartmentsList() {
    this.shopService.getDepartmentList().subscribe(response => {
      if (response)
        this.departments = response;
    },
      error => {
        console.log(error);
      });
  }
}
