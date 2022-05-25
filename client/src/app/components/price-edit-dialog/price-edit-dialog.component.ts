import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-price-edit-dialog',
  templateUrl: './price-edit-dialog.component.html',
  styleUrls: ['./price-edit-dialog.component.scss']
})
export class PriceEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<PriceEditDialogComponent>) {}


  ngOnInit(): void {
    if (this.data) {
        console.log("DATA ", this.data);
    }
  }


}
