import { Component, OnInit, Input } from '@angular/core';

export interface Discharge {
  article: string;
  name: string;
  barcode: string;
  count: string;
  units: string;
  cost: string;
  summ: string;
}

const ELEMENT_DATA: Discharge[] = [
  {article: '123451', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123452', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123453', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123454', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123455', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123457', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123458', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123459', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123416', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123426', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123436', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123446', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123466', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123476', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123486', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123156', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123256', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123356', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123556', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123656', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123756', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123856', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123956', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '121456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '122456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '124456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '125456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '126456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '127456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '128456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '129456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '113456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '123456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '133456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '143456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '153456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '163456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '173456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '183456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '193456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '223456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '323456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '423456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '523456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '623456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '723456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '823456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
  {article: '923456', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'},
];  

@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.scss']
})
export class DischargeComponent implements OnInit {

  checked: any;
  isPrint = false;
  @Input() data;
  displayedColumns = ['article', 'name', 'barcode', 'count', 'units', 'cost', 'summ'];
  dataSource = ELEMENT_DATA;
  selectedRow: Discharge = {article: '0', name: 'Banana', barcode: '1245789865', count: '3',  units: 'шт.', cost: '1', summ: '3'};
  isSelectedRow = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRowClick(row: Discharge) {
    if(this.selectedRow.article !== row.article) {
      this.isSelectedRow = false;
      this.selectedRow = {article: row.article, name: row.name, barcode: row.barcode, count: row.barcode,  units: row.units, cost: row.cost, summ: row.summ};
    } else {
      this.isSelectedRow = true;
      this.selectedRow.article = '0';
    }
  }
}
