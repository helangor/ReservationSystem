import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation) {
    let url = this.baseUrl + "reservation/CreateReservation"
    return this.http.post<any>(url, reservation);
  }
}
