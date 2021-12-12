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
    email: ''
  };

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ReservationDialogComponent>)
  {}


  ngOnInit(): void {
  }

  changeIndex(tabgroup: MatTabGroup, number: number){
    tabgroup.selectedIndex = number;
  }
  
  submitReservationForm(reservation: any) {
    console.log(reservation);
  }

  test() {

  }

}
