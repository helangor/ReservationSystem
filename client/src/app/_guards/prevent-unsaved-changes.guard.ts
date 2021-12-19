import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from '../components/product-edit/product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate( product: ProductEditComponent): boolean {
    if (product.editForm.dirty) {
      return confirm('Oletko varma, että haluat poistua? Tallentamattomat muutokset menetetään.')
    }
    return true;
  }
  
}
