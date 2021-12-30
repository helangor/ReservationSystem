import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(productName: string) {
    return this.http.get<Product>(this.baseUrl + "products/" + productName );
  }

  getReservedDays(id: number) {
    return this.http.get<any>(this.baseUrl + "products/GetReservedDays?id=" + id);
  }

  getReservations(id: number) {
    return this.http.get<any>(this.baseUrl + "products/get-reservations?id=" + id);
  }

  updateProduct(product: Product) {
    let url = this.baseUrl + "products/update-product"
    return this.http.post<any>(url, product);
  }

}
