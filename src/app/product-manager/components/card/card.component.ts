import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceListFormComponent } from '../../dialog-windows/place-list-form/place-list-form.component';
import { StoragePlacesEditorComponent } from '../../dialog-windows/storage-places-editor/storage-places-editor.component';
import { ProductPropAnswer } from '../../models/product-prop-answer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data: ProductPropAnswer;
  splitElement = '; ';
  // productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], []);

  displayedColumnsDelivers = ['delivers'];
  displayedColumnsBarcodes = ['barcodes'];

  constructor(
    public dialog: MatDialog,
  ) { }
  screenHeight: number
  screenWidth: number
  shortVersion: boolean = false
  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1000) {
      this.shortVersion = false
    } else {
      this.shortVersion = true
    }
    console.log(this.shortVersion)
  }




}
