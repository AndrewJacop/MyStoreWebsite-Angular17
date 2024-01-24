import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private FAKE_API_URL = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.FAKE_API_URL}/products`);
  }
}
