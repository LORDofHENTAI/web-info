import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentList } from 'src/app/common/models/departmens';
import { PriceTypeList } from 'src/app/common/models/price-type-list';
import { StoreList } from 'src/app/common/models/store-list';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { CookieLogin } from '../models/cookie-login';

interface Themes {
  Name: string,
  Color: string,
  Background?: string,
  NavBard?: string,
  Selecter?: string,
  TextColor?: string
}
@Component({
  selector: 'app-select-shop',
  templateUrl: './select-shop.component.html',
  styleUrls: ['./select-shop.component.scss']
})
export class SelectShopComponent implements OnInit {

  cookie: CookieLogin;
  shops: StoreList[];
  types: PriceTypeList[];
  departments: DepartmentList[];
  shopForm: FormGroup;
  mainThemes: Themes[] = [
    { Name: 'Light', Color: '#fff' },
    { Name: 'Dark', Color: '#0F0F0F' }
  ]
  colorThemes: Themes[] = [
    { Name: 'Standart', Color: 'linear-gradient(to right,#a8edea,#fed6e3)' },
    { Name: 'Red', Color: '#F44336' },
    { Name: 'Blue', Color: '#376FBF' },
    { Name: 'Green', Color: '#2dce98' },
    { Name: 'Orange', Color: '#F79546' },
    { Name: 'Purple', Color: '#6440B6' },
    { Name: 'Grey', Color: '#9c9c9c' },
    { Name: 'White', Color: '#e2e2e2' },
  ]

  constructor(
    private shopService: ShopService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<SelectShopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.cookie = this.tokenService.getCookie();
    this.shopForm = new FormGroup({
      "shop": new FormControl(this.cookie.shopId, Validators.required),
      "type": new FormControl(this.cookie.typeId, Validators.required),
      "department": new FormControl(this.cookie.departmentId, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getShopList();
    this.getTypeList();
    this.getDepartmensList();
  }

  getShopList() {
    this.shopService.getShops().subscribe(response => {
      if (response)
        this.shops = response;
    },
      error => {
        console.log(error);
      });
  }

  getTypeList() {
    this.shopService.getTypes().subscribe(response => {
      if (response)
        this.types = response;
    },
      error => {
        console.log(error);
      });
  }

  getDepartmensList() {
    this.shopService.getDepartmentList().subscribe(response => {
      if (response)
        this.departments = response;
    },
      error => {
        console.log(error);
      });
  }

  submit() {
    this.cookie.shopId = this.shopForm.value.shop;
    this.cookie.typeId = this.shopForm.value.type;
    this.cookie.departmentId = this.shopForm.value.department;
    this.tokenService.setCookie(this.cookie);
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}