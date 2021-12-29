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

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  product: Product;
  user: User;
  reservations: Reservation[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private productService: ProductService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {

    this.productService.getProduct(this.route.snapshot.paramMap.get('productName')).subscribe(product => {
      this.product = product;
      this.loadReservations(this.product.id)
    })
  }
  
  loadReservations(id: number) {
    this.productService.getReservations(id).subscribe(res => {
      this.reservations = res;
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(res => {
      this.snackbar.open("Successfully updated");
      this.editForm.reset(product);
    }, error => console.log(error))
  }
}
