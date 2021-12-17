import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  reservedDays = [];
  myDateFilter: (d: any) => boolean;

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
      this.getReservedDays();
    })
  }

  _onSelectedChange(date: any): void {
    date.hours(12);
    if (!this.selectedDateRange && date) {
      let tomorrow = moment(date).add(1, 'days');
      this.selectedDateRange = new DateRange(date, tomorrow);
      return
    } 
    
    if (date > this.selectedDateRange.end) {
      this.selectedDateRange = new DateRange(this.selectedDateRange.start, date);
    } else {
      let tomorrow = moment(date).add(1, 'days');
      this.selectedDateRange = new DateRange(date, tomorrow);
    }


    for (let i = 0; i < this.reservedDays.length; i++) {
      let reservedDay = this.reservedDays[i];
      let rangeContainsReservedDays = reservedDay.isBetween(this.selectedDateRange.start, date);

      if (rangeContainsReservedDays && date > reservedDay) {
        let tomorrow = moment(date).add(1, 'days');
        this.selectedDateRange = new DateRange(date, tomorrow);
        break;
      } else if (rangeContainsReservedDays){
        this.selectedDateRange = new DateRange(this.selectedDateRange.start, reservedDay);
        break;
      }
    }
    console.log(this.selectedDateRange)
  }

  reserve() {
    this.openReservationDialog();
  }

  openReservationDialog() {
     const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        dateRange: this.selectedDateRange,
        company: this.company
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




  getReservedDays() {
    let days = [];

    this.companyService.getReservedDays(this.company.id).subscribe(reservations => {
      reservations.forEach(day => {
        days.push(moment(day))
      })
      this.reservedDays = days;  
      this.initDateFilter();
    })
  }

  initDateFilter() {
    this.myDateFilter = (d: any) => {    
      let isReserved = this.isReservedDay(d);
      if (isReserved) {return false;}
  
      let now = moment().set('hour', 18);

      return d > now;
    }    
  }
  
  isReservedDay(d: any) {
    let isReserved: boolean;
    this.reservedDays.forEach(reservedDay => {
      if (reservedDay.isSame(d, 'day')) {
        isReserved = true;
      }
    });
    return isReserved;
  }

  sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
}


