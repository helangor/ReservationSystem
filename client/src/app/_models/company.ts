import { Time } from "@angular/common";
import { Product } from "./product";
import { User } from "./user";

export interface Company {
    id: number,
    name: string;
    created: Date;
    Created: Time;
    introduction: string;
    products: Product[];
    users: User[];
}