import { Time } from "@angular/common";
import { Photo } from "./photo";
import { PriceRow } from "./priceRow";
import { Reservation } from "./reservation";

export interface Product {
    id: number,
    name: string;
    created: Date;
    reservationStartTime: Time;
    reservationEndTime: Time;
    introduction: string;
    city: string;
    photos: Photo[];
    reservations: Reservation[];
    priceRows: PriceRow[];
}