import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface Pit {
  num: string;
  date: string;
  department: string;
  status: string;
  shop: string;
}

const ELEMENT_DATA: Pit[] = [
  { num: '123451', date: '1245789865', department: 'Banana',  status: '3',  shop: 'шт.' }
];

@Component({
  selector: 'app-product-pits',
  templateUrl: './product-pits.component.html',
  styleUrls: ['./product-pits.component.scss']
})
export class ProductPitsComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  selectedRow: any;
  requests: Array<string> = ['Все заявки', 'Черновик', 'Сформирован для склада', 'Сформирован полностью'];
  displayedColumns = ['num', 'date', 'department', 'status', 'shop'];       
  selectedRequest = 'Все заявки';
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectRowClick(row) {

  }
}
