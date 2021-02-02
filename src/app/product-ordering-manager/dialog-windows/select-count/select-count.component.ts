import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  
  constructor(
    public dialogRef: MatDialogRef<SelectCountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    if(this.data)
      this.countItem = this.data.count;
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
