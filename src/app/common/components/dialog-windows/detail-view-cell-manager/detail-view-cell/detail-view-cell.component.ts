import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  cell: string;
  stillage: string, 
  floor: string,
  num: string 
}

@Component({
  selector: 'app-detail-view-cell',
  templateUrl: './detail-view-cell.component.html',
  styleUrls: ['./detail-view-cell.component.css']
})
export class DetailViewCellComponent implements OnInit {

  stillageItem: any;

  constructor(
    public dialogRef: MatDialogRef<DetailViewCellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data) {
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
