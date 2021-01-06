import { Component, OnInit, Input } from '@angular/core';
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
  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', '');
  listPlaces: Array<string> = [];
  listDelivers: Array<string> = [];

  displayedColumnsPlaces = ['place', 'bt'];
  displayedColumnsDelivers = ['delivers'];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productPropAnswer = this.data;
  }

  openStoragePlacesDialog(element: string) {
    let str = element.split(' | ');
    let place = str[0];
    let count = str[1];
    const dialogRef = this.dialog.open(StoragePlacesEditorComponent, {
      width: "300px",
      data: { article: this.productPropAnswer.article, place: place, count: count, units: this.productPropAnswer.mesabbrev },
    });
    dialogRef.afterClosed().subscribe(result => {
      // if(result === 'true') {
      //   this.onSelectRowClick(this.dataSourceProducts[0]);
      // }
    });
  }

  openPlaceForm(listPlaces) {
    let list = [this.productPropAnswer];
    const dialogRef = this.dialog.open(PlaceListFormComponent, {
      data: { productList: list, placeList: listPlaces  },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }
}
