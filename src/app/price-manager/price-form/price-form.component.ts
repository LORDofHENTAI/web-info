import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckModel } from '../models/check-model';
import { CheckAnswer } from '../models/check-answer';
import { PriceService } from '../services/price.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { SelectCountComponent } from '../dialog-windows/select-count/select-count.component';
import { AddToVipiska } from '../models/add-to-vipiska';
import { TokenService } from 'src/app/common/services/token/token.service';
import { VipiskaQuery } from '../models/vipiska-query';
import { VipiskaEnd } from '../models/vipiska-end';
import { Vipiska } from '../models/vipiska';
import { VipiskaDelete } from '../models/vipiska-delete';
import { VipiskaEdit } from '../models/vipiska-edit';

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
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss']
})
export class PriceFormComponent implements OnInit {

  token = 'kaktus';
  searchString: string = '';
  article: string = '';
  barcode: string = '';
  searchData: CheckModel = new CheckModel('', '', '', '');
  product: CheckAnswer = new CheckAnswer('', '', '', '', '', '', false, '', '');

  selectedStore: string;
  stores: Array<Store> = ELEMENT_DATA;
  isBtSearchActive = false;

  @ViewChild("inputSearch") inputSearch: MatInput;
  // listVipiska: VipiskaEnd = new VipiskaEnd([new Vipiska('','', '', '','', '','', '','',  false) ], '');
  listVipiska: VipiskaEnd;
  cancelClicked = false;
  displayedColumnsPrint = ['name', 'quantity', 'mesname', 'price', 'summa', 'barcode'];
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private priceService: PriceService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.selectedStore = localStorage.getItem('selectedStore');
    this.getListVipiska();
  }

  ngAfterViewInit() {
    this.inputSearch.focus();
  }

  getListVipiska() {
    this.priceService.getListVipiska(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if(response) {
        this.listVipiska = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    }); 
  }

  onInputSearchData($event: string) {
    this.searchString = $event;
    if($event.length >= 6) this.isBtSearchActive = true;
    else this.isBtSearchActive = false;
  }

  onChange(event) {
    localStorage.setItem('selectedStore', this.selectedStore);
  }
  
  onSearchOrder() {
    if(this.selectedStore) {
      if(this.searchString.length >= 6) {    
        if(this.searchString.length > 7)
          this.barcode = this.searchString;
        if(this.searchString.length === 6 || this.searchString.length === 7)
          this.article = this.searchString; 
        this.priceService.getProduct(new CheckModel(this.token, this.article, this.barcode, this.selectedStore)).subscribe(response => {
          if(response.status === 'not action')
            this.snackbarService.openSnackBar('Данного артикула или штрихкода нет.', this.action, this.styleNoConnect); 
          else if(response.status === 'not found')
              this.snackbarService.openSnackBar('На данный товар акции нет.', this.action, this.styleNoConnect); 
            else {
              this.product = response;
              this.inputSearch.value = '';
            }
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        }); 
      } 
    } else {
      this.snackbarService.openSnackBar('Выберите магазин', this.action);
    }
  }

  onAddProduct(product: CheckAnswer) {
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let addToVipiska = new AddToVipiska(this.tokenService.getToken(), product.article, this.selectedStore, result);
        this.priceService.addToVipiska(addToVipiska).subscribe(response => {
          if(response.status.toLocaleLowerCase() === 'ok') {
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

  onClearList() {
    this.priceService.clearList(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.snackbarService.openSnackBar('Выписка очищена.', this.action);
        this.getListVipiska();
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onCancel() {
  }

  onDeleteItem(vipiska: Vipiska) {
    this.priceService.deleteItem(new VipiskaDelete(this.tokenService.getToken(), vipiska.id)).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
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
      width: "300px",
      data: { count: vipiska.quantity },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.priceService.editItem(new VipiskaEdit(this.tokenService.getToken(), vipiska.id, result)).subscribe(response => {
          if(response.status.toLocaleLowerCase() === 'ok') {
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
}
