import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-pits',
  templateUrl: './product-pits.component.html',
  styleUrls: ['./product-pits.component.scss']
})
export class ProductPitsComponent implements OnInit {

  requests: Array<string> = ['Все заявки', 'Черновик', 'Сформирован для склада', 'Сформирован полностью'];
  selectedRequest = 'Все заявки';
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
