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

interface Store {
  id: string,
  type: string,
  name: string,
}

const ELEMENT_DATA: Store[] = [
  { id: '8', type: '3', name: 'Долгиновский'},
  { id: '11', type: '4', name: 'Брест'},
  { id: '18', type: '6', name: 'Партизанский'},
  { id: '21', type: '7', name: 'Тимирязева'},
  { id: '22', type: '8', name: 'Каменогорская'},
  { id: '23', type: '9', name: 'Никифорово'},
  { id: '24', type: '10', name: 'Независимости'},
  { id: '25', type: '11', name: 'Молодечно'},
  { id: '27', type: '13', name: 'ДанаМолл'},
  { id: '28', type: '14', name: 'Боровая'},
  { id: '30', type: '16', name: 'Галерея'},
  { id: '31', type: '17', name: 'Щомыслицы'},
  { id: '32', type: '18', name: 'Жуково'},
];

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({ 
      "userName": new FormControl(''),
      "userPassword": new FormControl('', Validators.required),
      "userShop": new FormControl(null, Validators.required)
  });

  isLoginUser: boolean = false;
  loginQuery: LoginQuery;

  shops: Array<Store> = ELEMENT_DATA;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Info'); 
  }

  checkResponse(response: LoginResponse) : boolean {
    if(response) 
      if(response.token) 
        if(response.token.length > 0) 
          return true; 
  }

  submit() {
    this.loginQuery = new LoginQuery(this.loginForm.value.userName, this.loginForm.value.userPassword);
    this.loginService.getLogin(this.loginQuery).subscribe(response => {
      if(this.checkResponse(response)) {
        // let t: CookieLogin;
        this.tokenService.setCookie(CookieLogin.setCookieLogin(this.loginForm.value.userShop, response));
        this.tokenService.logEvent(true);
        // this.router.navigate(['/prices']);
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
}
