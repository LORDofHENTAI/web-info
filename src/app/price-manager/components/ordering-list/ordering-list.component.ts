import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { SelectCountComponent } from '../../dialog-windows/select-count/select-count.component';
import { Vipiska } from '../../models/vipiska';
import { VipiskaDelete } from '../../models/vipiska-delete';
import { VipiskaEdit } from '../../models/vipiska-edit';
import { VipiskaEnd } from '../../models/vipiska-end';
import { VipiskaQuery } from '../../models/vipiska-query';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-ordering-list',
  templateUrl: './ordering-list.component.html',
  styleUrls: ['./ordering-list.component.scss']
})
export class OrderingListComponent implements OnInit {

  listVipiska: VipiskaEnd;

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

  onClearList() {
    
  }
}
