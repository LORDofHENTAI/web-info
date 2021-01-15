import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceTypeList } from 'src/app/common/models/price-type-list';
import { StoreList } from 'src/app/common/models/store-list';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { CookieLogin } from '../models/cookie-login';

@Component({
  selector: 'app-select-shop',
  templateUrl: './select-shop.component.html',
  styleUrls: ['./select-shop.component.scss']
})
export class SelectShopComponent implements OnInit {

  cookie: CookieLogin;
  shops: StoreList[];
  types: PriceTypeList[];
  shopForm: FormGroup;

  constructor(
    private shopService: ShopService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<SelectShopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.cookie = this.tokenService.getCookie();
    this.shopForm = new FormGroup({ 
      "shop": new FormControl(this.cookie.shopId, Validators.required),
      "type": new FormControl(this.cookie.type, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getShopList();
    this.getTypeList();
  }

  getShopList() {
    this.shopService.getShops().subscribe(response => {
      if(response)
        this.shops = response;
    }, 
    error => { 
      console.log(error);
    });
  }

  getTypeList() {
    this.shopService.getTypes().subscribe(response => {
      if(response)
        this.types = response;
    }, 
    error => { 
      console.log(error);
    });
  }

  submit() {
    this.cookie.shopId = this.shopForm.value.shop;
    this.cookie.type = this.shopForm.value.type;
    this.tokenService.setCookie(this.cookie);
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}