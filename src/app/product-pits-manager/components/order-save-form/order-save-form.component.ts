import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderStatus } from '../../models/order-status';

interface Save {
  satusId: number,
  statuses: OrderStatus[],
}

@Component({
  selector: 'app-order-save-form',
  templateUrl: './order-save-form.component.html',
  styleUrls: ['./order-save-form.component.scss']
})
export class OrderSaveFormComponent implements OnInit {

  statusForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<OrderSaveFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Save,
  ) { 
    this.statusForm = new FormGroup({ 
      "status": new FormControl(this.data.satusId, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    this.dialogRef.close(this.statusForm.value.status);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
