import { Product } from "./product";

export class Reservation {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    email: string;
    startTime: Date;
    endTime: Date;
    status: string;
    extraInfo: string;

    product: Product;
}