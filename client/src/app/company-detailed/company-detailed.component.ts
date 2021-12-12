import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-detailed',
  templateUrl: './company-detailed.component.html',
  styleUrls: ['./company-detailed.component.scss']
})
export class CompanyDetailedComponent implements OnInit {
  company: Company;
  selectedDateRange: DateRange<Date>;
  
  constructor(
    private companyService: CompanyService, 
    private route: ActivatedRoute,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('companyName')).subscribe(company => {
      this.company = company;
    })
  }


  _onSelectedChange(date: Date): void {
    //TODO: tähän saa laitettua, että jos välissä varattu päivä niin ei voi valita.
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,

        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  reserve() {
    if (!this.selectedDateRange) return;

    if (this.selectedDateRange.start == null || this.selectedDateRange.end == null) return;

    this.openReservationDialog();
    console.log("RESERVE ", this.selectedDateRange);

  }


  myDateFilter = (d: any) => {
    let calendarDate = d.toDate();
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 18);

    let day = new Date('2021-12-13T03:24:00');
    if (this.sameDay(day, calendarDate)) return false;
    //TODO: Tässä filtteröi pois päivät, jotka varattu. NgOninitissä hakee varatut päivät ja sitten tässä check löytyykö.

    return calendarDate > currentDate;
  }

  sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  openReservationDialog() {
    const dialogRef = this.dialog.open(ReservationDialogComponent);

    this.dialog.open(ReservationDialogComponent, {
      data: {
        dateRange: this.selectedDateRange,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}

