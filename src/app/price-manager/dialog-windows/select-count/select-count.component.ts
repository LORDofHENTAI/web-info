import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

interface DialogData {
  count: number;
}

@Component({
  selector: 'app-select-count',
  templateUrl: './select-count.component.html',
  styleUrls: ['./select-count.component.scss']
})
export class SelectCountComponent implements OnInit {

  searchString: string ='';
  countItem: number;
  
  @ViewChild("inputData") inputData: MatInput;

  constructor(
    public dialogRef: MatDialogRef<SelectCountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.countItem = this.data.count;
  }

  ngAfterViewInit() {
    this.inputData.focus();
  }

  onInputSearchData($event: string) {
    this.searchString = $event;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogRef.close(this.countItem);
  }
}
