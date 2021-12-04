import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get<Company[]>(this.baseUrl + 'companies');
  }


  getCompany(id: number) {
    return this.http.get<Company>(this.baseUrl + "company/" + id );
  }

}
