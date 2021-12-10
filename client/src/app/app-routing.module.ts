import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CompanyAdminPanelComponent } from './company-admin-panel/company-admin-panel.component';
import { CompanyDetailedComponent } from './company-detailed/company-detailed.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'admin', component: AdminPanelComponent, canActivate: [AuthGuard]},
      {path:'company-admin', component: CompanyAdminPanelComponent},
      {path:'companies/edit', component: CompanyEditComponent, canDeactivate: [PreventUnsavedChangesGuard], pathMatch: 'full'}
    ]
  },
  {path:'companies/:companyName', component: CompanyDetailedComponent},
  {path:'login', component: LoginComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
