import { Component, OnInit, Input } from '@angular/core';
import { ProductAddon } from '../../models/product-addon';

@Component({
  selector: 'app-extra-characteristic',
  templateUrl: './extra-characteristic.component.html',
  styleUrls: ['./extra-characteristic.component.scss']
})
export class ExtraCharacteristicComponent implements OnInit {

  @Input() data: ProductAddon[];
  
  displayedColumns = ['addonName', 'addonValue'];

  constructor() { }

  ngOnInit(): void {
    this.data;
  }
}