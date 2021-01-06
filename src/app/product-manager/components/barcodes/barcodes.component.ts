import { Component, OnInit, Input } from '@angular/core';

export interface Barcode {
  article: string;
  barcode: string;
}

const ELEMENT_DATA: Barcode[] = [
  {article: '1210456', barcode: '99999999999'},
  {article: '1214346', barcode: '22222222222'},
  {article: '1218654', barcode: '33333333333'},
  {article: '1235467', barcode: '44444444444'},
  {article: '1767899', barcode: '55555555555'},
];

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.scss']
})
export class BarcodesComponent implements OnInit {

  @Input() data: any;
  
  displayedColumns = ['article', 'barcode'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
}