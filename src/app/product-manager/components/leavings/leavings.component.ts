import { Component, OnInit, Input } from '@angular/core';

export interface Leaving {
  store: string;
  leaving: string;
  reserve: string;
  acceptance: string;
  supply: string;
  losses: string;
  oper_real: string;
  oper_leav: string;
}

const ELEMENT_DATA: Leaving[] = [
  {store: 'Hydrogen', leaving: 'H', reserve: '12', acceptance: '3',  supply: '44', losses: '1', oper_real: '-', oper_leav: '-'},

];

@Component({
  selector: 'app-leavings',
  templateUrl: './leavings.component.html',
  styleUrls: ['./leavings.component.scss']
})
export class LeavingsComponent implements OnInit {

  @Input() data;
  displayedColumns = ['store', 'leaving', 'reserve', 'acceptance', 'supply', 'losses', 'oper_real', 'oper_leav'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
