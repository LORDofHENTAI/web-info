import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VipiskaEnd } from 'src/app/price-manager/models/vipiska-end';

@Component({
  selector: 'app-print-window',
  templateUrl: './print-window.component.html',
  styleUrls: ['./print-window.component.scss']
})
export class PrintWindowComponent implements OnInit {

  WindowPrt: Window;
  tags: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  constructor(
    public dialogRef: MatDialogRef<PrintWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VipiskaEnd,
  ) { }

  ngOnInit(): void {
    this.data.list;
  }

  onOkClick() {

  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  async onPrint() {
    const printContent = document.getElementById("print-price-section");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`<html><head></head>
    <style>
      @font-face {
        font-family: "Metapro Bold";
        src: url("../../../assets/fonts/METAPRO-BOLD.OTF") format("opentype");
      }
      p {
          margin: 0;
      }
      .price {
          border: 1px solid black;
          width: 8.6cm;
          height: 5.5cm;
      }
      .name-shop {
          text-align: center;
          font-size: 2.5mm;
          margin-bottom: 0;
      }
      .block-name-product {
          height: 2cm;
      }
      .name-product {
          font-family: 'Metapro Bold';
          font-size: 16px;
          margin-left: 3mm;
          margin-right: 1cm;
          margin-bottom: 3mm;
          
      }
      .form-inline {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
      }
      .cost {
          font-family: "Metapro Bold";
          font-size: 36px;
          max-width: 65mm;
          margin-left: auto;
          margin-right: -15mm;
      }
      .units {
          position: relative;
          bottom: -6px;
          max-width: 8mm;
          margin-left: auto;
          margin-right: 2mm;
      }
      .barcode {
          display: flex;
          flex-flow: column wrap;
          margin-left: 4mm;
          position: relative;
          bottom: -4mm;
      }
      .country {
          font-size: 12px;
          font-weight: 600;
          position: relative;
          bottom: -3px;
      }
      .data-product {
          width: 100%;
          display: flex;
          flex-flow: column wrap;
          position: relative;
          bottom: 6mm;
          margin-right: 3mm;
      }
      .data-product div {
          margin: 0 0 0 auto;
      }
      .card-data {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .card {
          // text-align: center;
          vertical-align: middle; 
      }
      @media print {
        body{
          counter-reset: pageNumber;
        }
        .pagebreak { 
          page-break-after: always;
          text-align: center;
        }
        .page-breaker:before{
          counter-increment: pageNumber;
          content: "Page:" counter(pageNumber);
        }
      }
    </style>`);
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();

    WindowPrt.focus();
    await this.delay(500);
    WindowPrt.print();
    setTimeout(() => {
      WindowPrt.close();
    }, 0.5);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}