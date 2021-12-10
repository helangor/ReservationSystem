import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get<Company[]>(this.baseUrl + 'companies');
  }

  getCompany(companyName: string) {
    return this.http.get<Company>(this.baseUrl + "companies/" + companyName );
  }
  
  getCompaniesByUserName(userName: string) {
    return this.http.get<Company[]>(this.baseUrl + "companies/GetCompaniesByUsername?username=" + userName);
  }

}
