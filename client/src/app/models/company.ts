import { Photo } from "./photo";

export interface Company {
    id: number,
    companyName: string;
    created: Date;
    introduction: string;
    city: string;
    photos: Photo[];
}