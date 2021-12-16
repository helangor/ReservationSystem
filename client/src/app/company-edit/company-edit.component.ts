import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @ViewChild('editForm') editForm: NgForm;
  companies: Company[];
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private companyService: CompanyService,
    private snackbar: MatSnackBar) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompaniesByUserName(this.user.username).subscribe(companies => {
      this.companies = companies;
      console.log("COMPANies ", this.companies);
    })
  }

  updateCompany(company: Company) {
    console.log(company);
    this.snackbar.open("Successfully updated");
    this.editForm.reset(company);
  }

}
