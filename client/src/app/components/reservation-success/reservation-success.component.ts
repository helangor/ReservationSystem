import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-reservation-success',
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.scss']
})
export class ReservationSuccessComponent implements OnInit {
  reservation: Reservation;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.reservation = this.dataService.reservation;
  }
}
