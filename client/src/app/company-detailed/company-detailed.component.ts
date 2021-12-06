import { Component, OnInit } from '@angular/core';
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

  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getCompany(this.route.snapshot.paramMap.get('companyName')).subscribe(company => {
      this.company = company;
    })
  }

}
