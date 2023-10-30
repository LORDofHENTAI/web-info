import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../common/services/snackbar/snackbar.service';
import { TokenService } from '../common/services/token/token.service';
import { CookieLogin } from '../login-manager/models/cookie-login';
import { Logout } from '../login-manager/models/logout';
import { SelectShopComponent } from '../login-manager/select-shop/select-shop.component';
import { LoginService } from '../login-manager/services/login.service';
import { PriceSettingsDialogComponent } from '../common/components/dialog-windows/price-settings-dialog/price-settings-dialog.component';
import { LoadActionComponent } from '../common/components/dialog-windows/load-action/load-action.component';
import { UserSettingsComponent } from '../common/components/dialog-windows/user-settings/user-settings.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoginUser = false;
  userName = '';
  isAdmin = '';
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) {
    this.tokenService.events$.forEach(value => { this.eventLogin(value) });
  }

  ngOnInit(): void {
    if (this.tokenService.isLoginUser()) {
      this.isLoginUser = true;
      this.userName = this.tokenService.getLogin();
      this.isAdmin = this.tokenService.getIsAdmin();
      console.log(this.isAdmin);
    }
    else {
      this.isLoginUser = false;
      this.router.navigate(['/login']);
    }
  }

  eventLogin(event: boolean) {
    if (event === true) {
      this.isLoginUser = event;
      this.userName = this.tokenService.getLogin();
    }
    else {
      this.isLoginUser = event;
      this.router.navigate(['/login']);
    }
  }

  onClickLogout() {
    this.loginService.postLogout(new Logout(this.tokenService.getLogin(), this.tokenService.getToken())).subscribe(response => {
      console.log(response);
      if (response = 'true') {
        this.tokenService.deleteCookie();
        this.isLoginUser = false;
        this.router.navigate(['/login']);
      }
      else {
        this.snackbarService.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  openSelectShop() {
    const dialogRef = this.dialog.open(SelectShopComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      // if(result)
      //   if(result.shop || result.type) {
      //     this.tokenService.setCookie(CookieLogin.setCookieLogin(result.shop, result.type, null));
      //   }
    });
  }

  openPriceSettingsDialog() {
    const dialogRef = this.dialog.open(PriceSettingsDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openLoadAction() {
    const dialogRef = this.dialog.open(LoadActionComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openUsersSetting() {
    const dialogRef = this.dialog.open(UserSettingsComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
