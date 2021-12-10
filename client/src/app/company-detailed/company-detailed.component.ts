import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-detailed',
  templateUrl: './company-detailed.component.html',
  styleUrls: ['./company-detailed.component.scss']
})
export class CompanyDetailedComponent implements OnInit {
  company: Company;
  selectedDateRange: DateRange<Date>;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  //TODO: Filtteri mennyttä päivää ei voi valita. Suomen kielelle kuukaudet. Inline kalenteri.
  
  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('companyName')).subscribe(company => {
      console.log("COMP ", company);
      this.company = company;
    })
  }


  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

}
