import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm: NgForm;
  isChecked: boolean;
  reservation: Reservation = {
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    email: '',
    startTime: undefined,
    endTime: undefined,
    product: undefined
  };

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ReservationDialogComponent>,
  private http: HttpClient,
  private reservationService: ReservationService,
  private snackbar: MatSnackBar)
  {}


  ngOnInit(): void {
    if (this.data) {
      this.reservation.startTime = this.data.dateRange.start.toDate();
      this.reservation.endTime = this.data.dateRange.end.toDate();
      this.reservation.product = this.data.product;
    }
  }

  changeIndex(tabgroup: MatTabGroup, number: number){
    tabgroup.selectedIndex = number;
  }

  confirmOrder() {
    console.log(this.reservation);
    this.reservationService.createReservation(this.reservation).subscribe(r => {
      this.snackbar.open("Created");
      this.dialogRef.close();
    })}
}