import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { CompanyService } from 'src/app/_services/company.service';
import { Company } from 'src/app/_models/company';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit-list',
  templateUrl: './product-edit-list.component.html',
  styleUrls: ['./product-edit-list.component.scss']
})
export class ProductEditListComponent implements OnInit {
  companies: Company[];
  user: User;

  constructor(
    private companyService: CompanyService, 
    private accountService: AccountService,
    private router: Router) 
    { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {

    this.companyService.getCompaniesByUserName(this.user.username).subscribe(companies => {
      this.companies = companies;
      if (companies.length == 1 && companies[0].products.length == 1) {
        this.router.navigateByUrl('/products/edit/' + companies[0].products[0].name);
      }
    })
  }
}