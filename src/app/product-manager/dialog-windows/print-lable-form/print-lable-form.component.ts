import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  data: string;
}

@Component({
  selector: 'app-print-lable-form',
  templateUrl: './print-lable-form.component.html',
  styleUrls: ['./print-lable-form.component.css']
})
export class PrintLableFormComponent implements OnInit {

  imgSource: string = '';

  constructor(
    public dialogRef: MatDialogRef<PrintLableFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
