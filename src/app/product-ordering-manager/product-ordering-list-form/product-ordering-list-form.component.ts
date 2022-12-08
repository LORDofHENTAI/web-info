import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductOrderingService } from 'src/app/product-ordering-manager/services/product-ordering.service';
import { VipiskaEnd } from 'src/app/product-ordering-manager/models/vipiska-end';
import { Vipiska } from 'src/app/product-ordering-manager/models/vipiska';
import { VipiskaDelete } from 'src/app/product-ordering-manager/models/vipiska-delete';
import { VipiskaQuery } from 'src/app/product-ordering-manager/models/vipiska-query';
import { VipiskaEdit } from 'src/app/product-ordering-manager/models/vipiska-edit';
import { SelectCountComponent } from 'src/app/product-ordering-manager/dialog-windows/select-count/select-count.component';
import { AddToVipiska } from 'src/app/product-ordering-manager/models/add-to-vipiska';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { DepartmentList } from 'src/app/common/models/departmens';
@Component({
  selector: 'app-product-ordering-list-form',
  templateUrl: './product-ordering-list-form.component.html',
  styleUrls: ['./product-ordering-list-form.component.scss']
})
export class ProductOrderingListFormComponent implements OnInit {

  @Input() isOpen: boolean;

  listVipiska: VipiskaEnd = new VipiskaEnd([], '0');
  displayedColumnsPrint = ['photo', 'name', 'quantity', 'mesname', 'price', 'summa', 'barcode'];
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  switchButton: boolean = false;

  addToVipiska: AddToVipiska;
  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private productOrderingService: ProductOrderingService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getListVipiska();
  }

  getListVipiska() {
    if (this.isOpen) {
      this.productOrderingService.getListVipiska(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
        if (response) {
          this.listVipiska = response;
        }
      },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
    }
  }

  addInExcerpt(article: string) {
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addToVipiska = new AddToVipiska(this.tokenService.getToken(), article, this.tokenService.getShop(), this.tokenService.getType(), String(result));
        this.productOrderingService.addToVipiska(this.addToVipiska).subscribe(response => {
          if (response = 'OK') {
            this.snackbarService.openSnackBar('Товар добавлен в выписку.', this.action);
            this.getListVipiska();
          }
        },
          error => {
            console.log(error);
            this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
          });
      }
    });
  }

  onDeleteItem(vipiska: Vipiska) {
    this.productOrderingService.deleteItem(new VipiskaDelete(this.tokenService.getToken(), String(vipiska.id))).subscribe(response => {
      if (response = 'ok') {
        this.snackbarService.openSnackBar('Позиция удалена.', this.action);
        this.getListVipiska();
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onEditItem(vipiska: Vipiska) {
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "400px",
      data: { count: vipiska.quantity },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productOrderingService.editItem(new VipiskaEdit(this.tokenService.getToken(), String(vipiska.id), String(result))).subscribe(response => {
          if (response = 'true') {
            this.snackbarService.openSnackBar('Количество изменено.', this.action);
            this.getListVipiska();
          }
        },
          error => {
            console.log(error);
            this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
          });
      }
    });
  }

  onClearList() {
    this.productOrderingService.clearList(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if (response = 'true') {
        this.snackbarService.openSnackBar('Выписка очищена.', this.action);
        this.getListVipiska();
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  openDialog() {
    console.log(this.listVipiska)
    const dialogRef = this.dialog.open(OrderingDialog);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  templateUrl: './ordering-dialog/ordering-dialog.html',
  styleUrls: ['./ordering-dialog/ordering-dialog.scss']
})
export class OrderingDialog implements OnInit {
  constructor(
    private tokenService: TokenService,
    private productOrderingService: ProductOrderingService,
    private shopService: ShopService

  ) { }
  listVipiska: VipiskaEnd = new VipiskaEnd([], '0');
  department: string = this.tokenService.getDepartment();
  document: string
  whoIsAccpted: string
  departments: DepartmentList[]
  displayedColumnsPrint = ['photo', 'name', 'quantity', 'mesname', 'barcode']
  currentDate = new Date()
  ngOnInit(): void {
    this.getListVipiska()
    this.GetDepartment();
  }
  getListVipiska() {
    this.productOrderingService.getListVipiska(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if (response) {
        this.listVipiska = response;
      }
    },
      error => {
        console.log(error);
      });
  }
  GetDepartment() {
    this.shopService.getDepartmentList().subscribe(response => {
      response.forEach((i) => {
        if (this.department === String(i.id))
          this.department = i.name
      })
    },
      error => {
        console.log(error)
      })
  }

}