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
    CompanyDetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
