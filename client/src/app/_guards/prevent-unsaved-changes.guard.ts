import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate( component: CompanyEditComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('Oletko varma, että haluat poistua? Tallentamattomat muutokset menetetään.')
    }
    return true;
  }
  
}
