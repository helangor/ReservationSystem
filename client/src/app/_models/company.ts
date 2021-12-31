import { Time } from "@angular/common";
import { Product } from "./product";
import { User } from "./user";

export interface Company {
    id: number,
    name: string;
    created: Date;
    introduction: string;
    products: Product[];
    users: User[];
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    email: string;
}