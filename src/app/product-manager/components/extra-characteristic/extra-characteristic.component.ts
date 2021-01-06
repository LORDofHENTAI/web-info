import { Component, OnInit, Input } from '@angular/core';

export interface ExtraCharacter {
  characteristic: string;
  value: string;
}

const ELEMENT_DATA: ExtraCharacter[] = [
  {characteristic: 'Hydrogen', value: 'H'},
  {characteristic: 'Helium', value: 'He'},
  {characteristic: 'Lithium', value: 'Li'},
  {characteristic: 'Beryllium', value: 'Be'},
  {characteristic: 'Boron', value: 'B'},
  {characteristic: 'Carbon', value: 'C'},
  {characteristic: 'Nitrogen', value: 'N'},
  {characteristic: 'Oxygen', value: 'O'},
  {characteristic: 'Fluorine', value: 'F'},
  {characteristic: 'Neon', value: 'Ne'},
];

@Component({
  selector: 'app-extra-characteristic',
  templateUrl: './extra-characteristic.component.html',
  styleUrls: ['./extra-characteristic.component.scss']
})
export class ExtraCharacteristicComponent implements OnInit {

  @Input() data: any;
  
  displayedColumns = ['characteristic', 'value'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    this.data;
  }
}
