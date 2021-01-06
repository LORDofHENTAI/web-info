import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { StoreEditor } from '../../models/store-editor';
import { Status } from 'src/app/common/models/status';
import { TokenService } from 'src/app/common/services/token/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';

export interface DialogData {
  article: string;
  place: string, 
  count: string,
  units: string,
}

@Component({
  selector: 'app-storage-places-editor',
  templateUrl: './storage-places-editor.component.html',
  styleUrls: ['./storage-places-editor.component.css']
})
export class StoragePlacesEditorComponent implements OnInit {

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageWrongCell= 'Ошибка сервера';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<StoragePlacesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.data;
  }

  onEdit() {
    this.productService.putCountProduct(new StoreEditor(this.tokenService.getToken(), this.data.article, this.data.place, this.data.count)).subscribe(response => {
      if(response) {
        this.checkResponse(response);
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close('false');
  }

  checkResponse(response: Status) {
    if(response.status === 'true'){
      this.snackbarService.openSnackBar('Количество изменено', this.action);
      this.dialogRef.close('true');
    }
    if(response.status === 'false') {
      this.snackbarService.openSnackBar('Ошибка измененния количества', this.action, this.styleNoConnect);
      this.onNoClick();
    }
  }
}
