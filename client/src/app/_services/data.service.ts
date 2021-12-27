import { Injectable } from '@angular/core';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public reservation: Reservation; 
  constructor() { }
}
