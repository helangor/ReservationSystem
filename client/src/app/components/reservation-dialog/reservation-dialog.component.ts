import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm: NgForm;
  isChecked: boolean;
  reservation: Reservation = new Reservation();


  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern("^[\+]?[0-9 ]{7,20}$")]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{5}")]);

  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Sähköpostiosoite virheellinen' : '';
  }
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ReservationDialogComponent>,
  private http: HttpClient,
  private reservationService: ReservationService,
  private snackbar: MatSnackBar,
  private router: Router,
  private dataService: DataService)
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
    this.dataService.reservation = this.reservation;

    this.reservationService.createReservation(this.reservation).subscribe(r => {
      this.snackbar.open("Created");
      this.dialogRef.close();
      this.router.navigateByUrl('/success')
    }, error => console.log(error))}
}