import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service'
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { GetUsersModel } from 'src/app/common/models/users/get-users-model';
import { InfoWorkersModel } from 'src/app/common/models/users/info-workers-model';
import { NewUserModel } from 'src/app/common/models/users/new-user-model';
import { DeleteWorkerModel } from 'src/app/common/models/users/delete-worker-model';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { StoreList } from 'src/app/common/models/store-list';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private tokenService: TokenService,
    private shopService: ShopService
  ) { }
  userList: InfoWorkersModel[]
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  styleAccess = 'green-snackbar'
  userId: number
  userName: string
  userStore: string
  userBarcode: string
  storeList: StoreList[]
  editSwitch: boolean = false
  searchInput: string
  ngOnInit(): void {
    this.GetShops()
    this.GetUsers()
  }
  GetUsers() {
    this.userService.GetUsers(new GetUsersModel(this.tokenService.getToken())).subscribe(
      result => {
        this.userList = result
      },
      error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  NewUser() {
    this.userService.NewUsers(new NewUserModel(this.tokenService.getToken(), new InfoWorkersModel(0, this.userName, String(this.userStore), this.userBarcode))).subscribe(
      result => {
        switch (result.status) {
          case 'true':
            this.snackBarService.openSnackBar('Пользователь добавлен', this.action, this.styleAccess)
            this.GetUsers()
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Неверный логин', this.action, this.styleNoConnect)
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            break
        }
      },
      error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  DeleteUser(element: number) {
    this.userService.DeleteUser(new DeleteWorkerModel(element, this.tokenService.getToken())).subscribe(
      result => {
        switch (result.status) {
          case 'true':
            this.snackBarService.openSnackBar('Пользователь удален', this.action, this.styleAccess)
            this.GetUsers()
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Неверный логин', this.action, this.styleNoConnect)
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            break
        }
      },
      error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  UpdateUser() {
    this.userService.UpdateUser(new NewUserModel(this.tokenService.getToken(), new InfoWorkersModel(0, this.userName, String(this.userStore), this.userBarcode))).subscribe(
      result => {
        switch (result.status) {
          case 'true':
            this.snackBarService.openSnackBar('Пользователь удален', this.action, this.styleAccess)
            this.GetUsers()
            this.CleanInput()
            this.NewUpdateSwitch()
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Неверный логин', this.action, this.styleNoConnect)
            this.CleanInput()
            this.NewUpdateSwitch()
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            this.CleanInput()
            this.NewUpdateSwitch()
            break
        }
      },
      error => {
        console.log(error)
        this.CleanInput()
        this.NewUpdateSwitch()
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  SearchUser() {
    this.userService.SearchUser(this.searchInput).subscribe(
      result => {
        this.userList = result
      },
      error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  GetShops() {
    this.shopService.getShops().subscribe(
      result => {
        this.storeList = result
      },
      error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    )
  }
  NewUpdateSwitch() {
    this.editSwitch = !this.editSwitch
  }
  StartUpdate(element: InfoWorkersModel) {
    this.userId = element.id
    this.userName = element.name
    this.userBarcode = element.barcode
    this.userStore = element.store
  }
  CleanInput() {
    this.userName = ''
    this.userStore = ''
    this.userBarcode = ''
  }
  imgSource: string = ''
  printBadge(element: string) {
    console.log(element)
    var printBtn = document.getElementById('print')
    this.imgSource = `https://barcode.tec-it.com/barcode.ashx?data=${element}`;
    setTimeout(() => printBtn.click(), 1000)
  }
}
