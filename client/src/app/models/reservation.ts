import { Company } from "./company";

export interface Reservation {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    email: string;
    startTime: Date;
    endTime: Date;
    company: Company;
}