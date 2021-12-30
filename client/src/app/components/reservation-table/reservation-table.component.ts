import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/_models/product';
import { Reservation } from 'src/app/_models/reservation';
import { ProductService } from 'src/app/_services/product.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReservationTableComponent implements OnInit {
  @Input() reservations: Reservation[];
  @Input() product: Product;

  columnsToDisplay: string[] = ['startTime', 'endTime', 'name'];
  
  constructor(private reservationService: ReservationService, private productService: ProductService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cancelReservation(reservation: Reservation) {
    this.reservationService.cancelReservation(reservation).subscribe(res => {
      this.snackbar.open("Varaus peruttu");
      this.loadReservations(this.product.id);
    }, error => {
      this.snackbar.open("Varauksen peruminen epäonnistui ", error);
    })
  }

  loadReservations(id: number) {
    this.reservationService.getValidFutureReservations(id).subscribe(res => {
      this.reservations = res;
    });
  }
}
