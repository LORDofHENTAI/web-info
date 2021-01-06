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

@Component({
  selector: 'app-discharge-print',
  templateUrl: './discharge-print.component.html',
  styleUrls: ['./discharge-print.component.scss']
})
export class DischargePrintComponent implements OnInit {
  // 'article',
  @Input() data;
  displayedColumns = [ 'name', 'barcode', 'count', 'units', 'cost', 'summ'];
  dataSource: any = null;
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.data;
  }

}
