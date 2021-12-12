import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RegisterComponent } from './register/register.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CompanyAdminPanelComponent } from './company-admin-panel/company-admin-panel.component';
import { SharedModule } from './_modules/shared/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailedComponent } from './company-detailed/company-detailed.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    RegisterComponent,
    CompanyCardComponent,
    CompanyAdminPanelComponent,
    NotFoundComponent,
    ServerErrorComponent,
    CompanyListComponent,
    CompanyDetailedComponent,
    CompanyEditComponent,
    ReservationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    SharedModule,
    ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fi-FI' },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: DateAdapter, useClass: MomentDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
