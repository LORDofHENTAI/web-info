import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface Request {
  num: string;
  date: string;
  section: string;
  satatus: string;
  note: string;
}

const ELEMENT_DATA: Request[] = [
  {num: '123', date: '05.08.2020', section: '23', satatus: 'ok', note: 'bla-bla'},
];

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  
  @Input() data;
  requests: Array<string> = ['Все заявки', 'Черновик', 'Сформирован для склада', 'Сформирован полностью'];
  selectedRequest = 'Все заявки';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  displayedColumns = ['num', 'date', 'section', 'satatus', 'note'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit(): void {
  }

  onCreateNewOrder() {
    this.range;
  }
}
