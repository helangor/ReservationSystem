import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { Reservation } from 'src/app/_models/reservation';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Company } from 'src/app/_models/company';
import { CompanyService } from 'src/app/_services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { PriceEditDialogComponent } from '../price-edit-dialog/price-edit-dialog.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('companyEditForm') companyEditForm: NgForm;

  product: Product;
  user: User;
  reservations: Reservation[];
  company: Company;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, 
    private productService: ProductService,
    private companyService: CompanyService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: MatDialog) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductAllData(this.route.snapshot.paramMap.get('productName')).subscribe(product => {
      this.product = product;

      console.log("PRODUCT ", this.product);
      
      
      this.getCompany(product.id)
    })
  }
  getCompany(id: number) {
    this.companyService.getCompanyByProductId(id).subscribe(res => {
      this.company = res;
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(res => {
      this.snackbar.open("Tiedot päivitetty");
      this.editForm.reset(product);
    }, error => {
     this.snackbar.open("Tietojen päivittäminen epäonnistui");
    });
  }

  
  updateCompany(company: Company) {
      console.log({company});
      this.companyService.updateCompany(company).subscribe(res => {
        this.snackbar.open("Yrityksen tiedot päivitetty");
        this.companyEditForm.reset(company);
      }, error => {
        this.snackbar.open("Tietojen päivittäminen epäonnistui");
       });
     }

     openPriceEditDialog() {
      const dialogRef = this.dialog.open(PriceEditDialogComponent, {
        data: {
          product: this.product
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }
   
}
