import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface Zpc {
  num: string;
  from: string;
  where: string;
  date: string;
  time: string;
  who: string;
  count: string;
  satatus: string;
}

const ELEMENT_DATA: Zpc[] = [
  {num: '123', from: 'от туда', where: 'туда', date: '05.02.2020', time: 'now', who: 'he', count: '2', satatus: 'ok'},
];

@Component({
  selector: 'app-zpc',
  templateUrl: './zpc.component.html',
  styleUrls: ['./zpc.component.scss']
})
export class ZpcComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  displayedColumns = ['num', 'from', 'where', 'date', 'time', 'who', 'count', 'satatus'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit(): void {
  }

  onGiveZPC() {

  }
}
