import { Component, HostListener, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrlPipe } from 'src/app/pipes/safeUrl.pipe';
import { environment } from 'src/environments/environment';
import { FastReportQuery } from '../../../product-price-manager/models/fast-report-query';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';
@Component({
  selector: 'app-print-window',
  templateUrl: './print-window.component.html',
  styleUrls: ['./print-window.component.scss']
})
export class PrintWindowComponent implements OnInit {

  url!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenService: TokenService,
    private productPriceService: ProductPriceService

  ) { }
  @Input() priceName?: string = this.data.priceName
  @Input() idFormat?: number = this.data.idFormat
  @Input() article?: string = this.data.article
  @Input() printType?: string = this.data.printType
  @Input() changeFlag?: boolean = this.data.switchEditablePrices
  @Input() whoIsAccpted?: string = this.data.whoIsAccpted
  @Input() document?: string = this.data.document
  @Input() department?: string = this.data.department
  ngOnInit(): void {
    switch (this.printType) {
      case 'etiketka':
        this.showPrintableLable()
        break;
      case 'Vipiska1.frx':
        this.showVipiska()
        break;
      case 'Vipiska2.frx':
        this.showMovingInvoice()
        break;
      default:
        this.showIFrame()
        break;
    }
  }

  showIFrame() {
    this.url = `${environment.apiUrl}api/FastReport/ShowReport?idFormat=${this.idFormat}&token=${this.tokenService.getToken()}&name=${this.priceName}&storeLoc=${this.tokenService.getShop()}&priceType=${this.tokenService.getType()}&changeFlag=${this.changeFlag}`;
  }
  showPrintableLable() {
    this.url = `${environment.apiUrl}api/FastReport/ReportEtiketka?Token=${this.tokenService.getToken()}&Article=${this.article}`;
  }
  showVipiska() {
    this.url = `${environment.apiUrl}productlist/print?token=${this.tokenService.getToken()}&type=${this.printType}`
  }
  showMovingInvoice() {
    this.url = `${environment.apiUrl}productlist/print?token=${this.tokenService.getToken()}&type=${this.printType}&store=${this.tokenService.getShop()}&document=${this.document}&department=${this.department}&whoAccepted=${this.whoIsAccpted}`
  }
}