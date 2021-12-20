import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailedComponent } from './components/product-detailed/product-detailed.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ReservationSuccessComponent } from './components/reservation-success/reservation-success.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'products/edit', component: ProductEditComponent, canDeactivate: [PreventUnsavedChangesGuard], pathMatch: 'full'}
    ]
  },
  {path:'products/:productName', component: ProductDetailedComponent},
  {path:'login', component: LoginComponent},
  {path:'success', component: ReservationSuccessComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
