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
    let url = this.baseUrl + "reservation/create-reservation"
    return this.http.post<any>(url, reservation);
  }

  cancelReservation(reservation: Reservation) {
    let url = this.baseUrl + "reservation/cancel-reservation"
    return this.http.post<any>(url, reservation);
  }

  getAllReservations(id: number) {
    return this.http.get<any>(this.baseUrl + "reservation/get-product-all-reservations?productId=" + id);
  }

  getValidFutureReservations(id: number) {
    return this.http.get<any>(this.baseUrl + "reservation/get-product-valid-future-reservations?productId=" + id);
  }
}
