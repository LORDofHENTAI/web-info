import { Component, OnInit } from '@angular/core';

export interface Price {
  article: string;
  barcode: string;
  name: string;
  cost: string;
  units: string;
  country: string;
  description: string;
  name_action: string;
}

const ELEMENT_DATA: Price[] = [
  {article: '123451', barcode: '1245789865', name: 'Banana',  cost: '3',  units: 'шт.', country: 'Tata', description: 'very good', name_action: 'tiytiy'}];

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  selectedSize: string = 'Бейдж';
  sizes: Array<string> = [ 'Бейдж', 'Средний', 'Маленький', 
                                  'А6 Альбом', 'А6 Портрет', 'А5 Портрет', 
                                  'А5 Альбом', 'А4 Портрет', 'А4 Альбом', 
                                  'Цветной', 'Этикетка', 'Напольный',
                                  'Акция', 'Акция напольный', 'Микро', 'А3'];
  
  displayedColumns = ['article', 'barcode', 'name', 'cost', 'units', 'country', 'description', 'name_action'];       
  dataSource = ELEMENT_DATA;
  selectedRow: Price = {article: '0', barcode: '1245789865', name: 'Banana',  cost: '3',  units: 'шт.', country: 'Tata', description: 'very good', name_action: 'tiytiy'};
  isSelectedRow = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRowClick(row) {
    if(this.selectedRow.article !== row.article) {
      this.isSelectedRow = false;
      this.selectedRow = {article: row.article, barcode: row.barcode, name: row.name,  cost: row.cost,  units: row.units, country: row.country, description: row.description, name_action: row.name_action};
    } else {
      this.isSelectedRow = true;
      this.selectedRow.article = '0';
    }
  }
}