import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductProp } from '../../models/product-prop';
import { ProductPropAnswer } from '../../models/product-prop-answer';
import { ProductService } from '../../services/product.service';

interface DialogData {
  article: string
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', '');
  
  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.productService.getProductProp(new ProductProp(this.tokenService.getToken(), this.data.article)).subscribe(response => {
      this.productPropAnswer = response; 
      // this.checkResponseProductProp(response); 
    }, 
    error => { 
      console.log(error);
    });
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  // checkResponseProductProp(response: ProductPropAnswer) {
  //   if(response) {
  //     this.listPlaces = [];
  //     this.listDelivers = [];
  //     this.productPropAnswer = response;  
  //     if(this.productPropAnswer.places) {
  //       var splitPlace = this.productPropAnswer.places.split("; ");
  //       splitPlace.forEach(element => {
  //         this.listPlaces.push(element);
  //       }); 
  //     }
  //     if(this.productPropAnswer.delivers) {
  //       var splitDelivers = this.productPropAnswer.delivers.split("; ");
  //       splitDelivers.forEach(element => {
  //         this.listDelivers.push(element);
  //       });
  //     }
  //     if(this.listPlaces.length > 0)
  //       if(this.listPlaces[this.listPlaces.length - 1].length == 0)
  //         this.listPlaces.pop();
  //     if(this.listDelivers.length > 0)    
  //       if(this.listDelivers[this.listDelivers.length - 1].length == 0)
  //         this.listDelivers.pop();
  //   }
  // }
}
