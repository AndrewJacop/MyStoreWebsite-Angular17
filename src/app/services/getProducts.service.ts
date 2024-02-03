import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { ICategory } from '../models/ICategory';
import { environment } from '../../environments/environment.development';

@Injectable({
  // root: accesable every where, any: lazy loading
  // @ application root in appconfig (singleton)
  // @ngMOdel providers > all declaration of the module (singleton)
  // @component side (import)
  providedIn: 'root',
})
export class GetProductsService {
  private FAKE_API_URL: string = `${environment.baseUrl}`;
  fullProductList: IProduct[] = [] as IProduct[];

  constructor(private httpClient: HttpClient) {
    this.getProducts().subscribe((data) => {
      this.fullProductList = data;
    });
  }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.FAKE_API_URL}/products`);
  }

  getProductsById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.FAKE_API_URL}/products/${id}`);
  }
  getProductsByCatId(catId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.FAKE_API_URL}/products?`, {
      params: { catId: catId },
    });
  }

  getFollowingProductId(currentid: number, direction: string): number {
    let idx = this.fullProductList.findIndex((ele) => {
      return Number(ele.id) == Number(currentid);
    });
    if (idx == -1) {
      return currentid;
    } else {
      if (direction == '>') {
        if (idx == this.fullProductList.length - 1) {
          return this.fullProductList[0].id;
        } else {
          return this.fullProductList[idx + 1].id;
        }
      } else if (direction == '<') {
        if (idx == 0) {
          return this.fullProductList[this.fullProductList.length - 1].id;
        } else {
          return this.fullProductList[idx - 1].id;
        }
      } else {
        alert('Error!!!');
        return -1;
      }
    }
  }

  getNextId() {
    return this.fullProductList[this.fullProductList.length - 1].id + 1;
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.FAKE_API_URL}/categories`);
  }

  addNewProduct(newPrd: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(
      `${this.FAKE_API_URL}/products`,
      newPrd
    );
  }
  editProductById(id: number, newPrd: IProduct): Observable<IProduct> {
    return this.httpClient.patch<IProduct>(
      `${this.FAKE_API_URL}/products/${id}`,
      newPrd
    );
  }

  deletProductById(id: number): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(
      `${this.FAKE_API_URL}/products/${id}`
    );
  }

  getProductsPage(page: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${this.FAKE_API_URL}/posts?_page=${page}&_per_page=10`
    );
  }
}
