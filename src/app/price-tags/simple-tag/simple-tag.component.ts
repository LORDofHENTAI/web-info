import { Component, Input, OnInit } from '@angular/core';
import { Vipiska } from 'src/app/price-manager/models/vipiska';

@Component({
  selector: 'app-simple-tag',
  templateUrl: './simple-tag.component.html',
  styleUrls: ['./simple-tag.component.scss']
})
export class SimpleTagComponent implements OnInit {

  @Input() vipiska: Vipiska;
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=2400001693535';

  constructor() { }

  ngOnInit(): void {
    this.vipiska;
  }
}
