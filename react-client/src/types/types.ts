export interface ProductDto {
  id: number;
  name: string;
  created: string;
  introduction: string;
  city: string;
  photos: PhotoDto[];
  priceRows: PriceRow[];
}

export interface PriceRow {
  id: number;
  name: string;
  dayOfWeeks: DayOfWeek[];
  certainDays: string[];
  amountOfConsecutiveDays: number;
  price: number;
}

export interface PhotoDto {
  id: number;
  url: string;
  isMain: string;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface Reservation {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  created: string;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  extraInfo: string;
  price: number;
  product: ProductDto;
}

export enum ReservationStatus {
  New,
  Confirmed,
  Rejected,
  Cancelled,
  NotAvailable,
}
