import { Photo } from "./photo";

export interface Product {
    id: number,
    productName: string;
    created: Date;
    introduction: string;
    city: string;
    photos: Photo[];
}