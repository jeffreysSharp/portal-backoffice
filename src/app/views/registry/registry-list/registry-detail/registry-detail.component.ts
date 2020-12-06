import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'registry-detail',
  templateUrl: './registry-detail.component.html'
})
export class RegistryDetailComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistryDetailComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      age: [item.age || ''],
      email: [item.email || ''],
      company: [item.company || ''],
      phone: [item.phone || ''],
      address: [item.address || ''],
      balance: [item.balance || ''],
      isActive: [item.isActive || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
