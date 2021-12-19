import { Time } from "@angular/common";
import { Photo } from "./photo";

export interface Product {
    id: number,
    name: string;
    created: Date;
    reservationStartTime: Time;
    reservationEndTime: Time;
    introduction: string;
    city: string;
    photos: Photo[];
}