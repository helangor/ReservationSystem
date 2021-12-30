import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';

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
  columnsToDisplay: string[] = ['startTime', 'endTime', 'name'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
