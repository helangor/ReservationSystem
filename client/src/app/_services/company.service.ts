import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompaniesByUserName(userName: string) {
    return this.http.get<Company[]>(this.baseUrl + "company/get-companies-by-username?username=" + userName);
  }
}
