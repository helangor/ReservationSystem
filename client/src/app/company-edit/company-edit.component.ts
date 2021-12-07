import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Company } from '../models/company';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  user: User;

  constructor(private accountService: AccountService, private companyService: CompanyService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getCompany(this.user.username).subscribe(company => {
      this.company = company;
    })
  }

}
