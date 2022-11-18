import { Component, OnInit } from '@angular/core';
import { LoadActionPriceService } from '../../../services/load-action-price/load-action-price.service'
import { LoadPriceQuery } from 'src/app/common/models/action-price-load/loadPriceQuery';
import { GetLoadPrice } from 'src/app/common/models/action-price-load/getLoadPrice';
import { TokenService } from 'src/app/common/services/token/token.service';
import { LoadPriceAnswer } from 'src/app/common/models/action-price-load/loadPriceAnswer';
@Component({
  selector: 'app-load-action',
  templateUrl: './load-action.component.html',
  styleUrls: ['./load-action.component.scss']
})
export class LoadActionComponent implements OnInit {
  selectedLoadType: string = '1';

  columnTempName: string[] = ['Артикул', 'Торговый объект', 'Цена', 'Тип цены', 'Процент скидки'];
  columnName: string[] = ['Артикул', 'Торговый объект', 'Цена', 'Тип цены', 'Процент скидки', 'Предварительное значение'];

  constructor(private tokenService: TokenService,
    private loadActionPriceService: LoadActionPriceService) { }

  ngOnInit(): void {
    this.getActionTable();
    this.getActionTempTable();
  }

  tempTable: LoadPriceAnswer
  actionTable: LoadPriceAnswer

  selectedFiles: File;
  selectedFile: File;
  selectedFileName: string = 'Выберите файл';

  selectFile(event: any) {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles[0].name;
    this.selectedFile = this.selectedFiles[0];
    console.log(this.selectedFile);
  }

  upload() {
    const loadPriceQuery = new LoadPriceQuery(this.tokenService.getToken(), this.selectedFile, this.selectedLoadType, this.tokenService.getShop(), this.tokenService.getType());
    this.loadActionPriceService.loadTempAction(loadPriceQuery).subscribe(response => {
      if (response)
        this.getActionTempTable()
    },
      error => {
        console.log(error)
      })
  }

  getActionTempTable() {
    this.loadActionPriceService.getTempActonTable(new GetLoadPrice(this.tokenService.getToken())).subscribe(response => {
      this.tempTable = response
    },
      error => {
        console.log(error);
      })
  }
  getActionTable() {
    this.loadActionPriceService.getActionTable(new GetLoadPrice(this.tokenService.getToken())).subscribe(response => {
      this.tempTable = response
    },
      error => {
        console.log(error);
      })
  }
  startAction() {
    this.loadActionPriceService.loadAction(new GetLoadPrice(this.tokenService.getToken())).subscribe(response => {
      this.getActionTable()
    },
      error => {
        console.log(error)
      })
  }
  clearTempTable() {
    this.loadActionPriceService.clearTempTable(new GetLoadPrice(this.tokenService.getToken())).subscribe(response => {
      this.getActionTempTable()
    },
      error => {
        console.log(error)
      })
  }
  clearTeble() {
    this.loadActionPriceService.clearTable(new GetLoadPrice(this.tokenService.getToken())).subscribe(response => {
      this.getActionTempTable()
    },
      error => {
        console.log(error)
      })
  }
}
