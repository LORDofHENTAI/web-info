import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-dialog-form',
  templateUrl: './inventory-dialog-form.component.html',
  styleUrls: ['./inventory-dialog-form.component.css']
})
export class InventoryDialogFormComponent implements OnInit {

  list = [];

  constructor(
    public dialogRef: MatDialogRef<InventoryDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    let list = this.data;
  }

  onOkClick() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }
}
