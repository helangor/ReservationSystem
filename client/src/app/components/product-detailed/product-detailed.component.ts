import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.scss']
})
export class ProductDetailedComponent implements OnInit {
  product: Product;
  selectedDateRange: DateRange<Date>;
  reservedDays = [];
  originalReservedDays = [];
  myDateFilter: (d: any) => boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadProduct();

  }

  loadProduct() {
    this.productService.getProduct(this.route.snapshot.paramMap.get('productName')).subscribe(product => {
      this.product = product;
      this.getReservedDays();
    })
  }

  _onSelectedChange(date: any): void {
    this.reservedDays = [...this.originalReservedDays];
    this.initDateFilter();

    var startTime = parseInt(this.product.reservationStartTime.toString().slice(0, 2))
    date.hours(startTime);

    if (!this.selectedDateRange || this.selectedDateRange.end || date <= this.selectedDateRange.start) {
      this.selectedDateRange = new DateRange(date, null);

      //Allows to select return to reserved day. 
      let nextResDay = this.getNextReservedDay(date);
      if (nextResDay) {
        this.reservedDays = this.removeDayFromReservedDay(nextResDay);
        this.initDateFilter();
      }

    } else if (this.selectedDateRange.start && !this.selectedDateRange.end) {
      this.selectedDateRange = new DateRange(this.selectedDateRange.start, date);
    }

    for (let i = 0; i < this.reservedDays.length; i++) {
      let reservedDay = this.reservedDays[i];
      let rangeContainsReservedDays = reservedDay.isBetween(this.selectedDateRange.start, date);
      if (rangeContainsReservedDays) {
        this.selectedDateRange = new DateRange(this.selectedDateRange.start, reservedDay);
        break;
      }
    }
  }

  reserve() {
    this.openReservationDialog();
  }

  openReservationDialog() {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        dateRange: this.selectedDateRange,
        product: this.product
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getReservedDays() {
    let days = [];

    this.productService.getReservedDays(this.product.id).subscribe(reservations => {
      reservations.forEach(day => {
        days.push(moment(day))
      })
      this.reservedDays = days;
      this.originalReservedDays = days;
      this.initDateFilter();
    })
  }

  initDateFilter() {
    this.myDateFilter = (d: any) => {
      let isReserved = this.isReservedDay(d);
      if (isReserved) { return false; }

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

  getNextReservedDay(d: any) {
    let reservedDay;
    for (let resDay of this.reservedDays) {
      if (resDay.isSameOrAfter(d)) {
        reservedDay = resDay;
        break;
      }
    }
    return reservedDay;
  }

  removeDayFromReservedDay(nextResDay: any) {
    return this.reservedDays.filter(day => !day.isSame(nextResDay, 'day'));
  }
}


