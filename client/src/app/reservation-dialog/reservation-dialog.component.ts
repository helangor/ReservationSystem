import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm: NgForm;
  isChecked: boolean;
  reservation: Reservation = {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    postalCity: '',
    phoneNumber: '',
    email: '',
    reservationStartTime: undefined,
    reservationEndTime: undefined
  };

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ReservationDialogComponent>)
  {}


  ngOnInit(): void {
    if (this.data) {
      console.log("DATA ", this.data);
      console.log(this.data.dateRange.start.toDate());
      this.reservation.reservationStartTime = this.data.dateRange.start.toDate();
      this.reservation.reservationEndTime = this.data.dateRange.end.toDate();
    }
  }

  changeIndex(tabgroup: MatTabGroup, number: number){
    tabgroup.selectedIndex = number;
  }
  
  submitReservationForm(reservation: any) {

  }

  confirmOrder() {
    console.log(this.reservation);

  }
}
