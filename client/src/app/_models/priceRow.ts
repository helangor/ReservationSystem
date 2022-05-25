export interface PriceRow {
    id: number;
    name: string;
    timePeriod: TimePeriod;
    specialStartDate: Date;
    specialEndDate: Date;
    price: number;
}

enum TimePeriod {
    Day,
    Week,
    Weekend,
    WeekendDay,
    Special
  }