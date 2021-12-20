import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/_models/product';
import { Reservation } from 'src/app/_models/reservation';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  products: Product[];
  user: User;
  reservations: Reservation[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private productService: ProductService,
    private snackbar: MatSnackBar) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByUserName(this.user.username).subscribe(products => {
      this.products = products;
      this.loadReservations(this.products[0].id)
    })
  }
  loadReservations(id: number) {
    this.productService.getReservations(id).subscribe(res => {
      console.log({res});
      
      this.reservations = res;
    });
  }

  updateProduct(product: Product) {
    console.log(product);
    this.snackbar.open("Successfully updated");
    this.editForm.reset(product);
  }

}
