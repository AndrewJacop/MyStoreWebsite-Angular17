import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesService {
  private API_URL = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}`);
  }
}
