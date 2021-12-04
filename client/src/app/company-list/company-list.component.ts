import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companiesService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log("COMPANIES ", companies);
    })
  }

}
