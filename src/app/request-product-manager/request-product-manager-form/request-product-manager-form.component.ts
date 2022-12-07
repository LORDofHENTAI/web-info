import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-request-product-manager-form',
  templateUrl: './request-product-manager-form.component.html',
  styleUrls: ['./request-product-manager-form.component.scss']
})
export class RequestProductManagerFormComponent implements OnInit {

  @Input() isOpen: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  tableHeader = ['№ Заявки', 'Дата', 'Секция', 'Статус', 'Примечание'];
}
