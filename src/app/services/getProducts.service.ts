import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { ICategory } from '../models/ICategory';

@Injectable({
  // root: accesable every where, any: lazy loading
  // @ application root in appconfig (singleton)
  // @ngMOdel providers > all declaration of the module (singleton)
  // @component side (import)
  providedIn: 'root',
})
export class GetProductsService {
  private FAKE_API_URL = 'https://fakestoreapi.com';
  fullProductList: IProduct[] = [];
  catList: ICategory[];

  constructor(private http: HttpClient) {
    this.catList = [
      { id: 1, name: 'electronics' },
      { id: 2, name: 'jewelery' },
      { id: 3, name: "men's clothing" },
      { id: 4, name: "women's clothing" },
    ];
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.FAKE_API_URL}/products`);
  }

  getProductsById(id: number): IProduct | null {
    let idx = this.fullProductList.findIndex((ele) => ele.id == id);
    if (idx == -1) {
      return null;
    } else {
      // console.log(this.fullProductList[idx]);
      return this.fullProductList[idx];
    }
  }

  getProductsByCatId(catId: number): IProduct[] {
    return this.fullProductList.filter(
      (prd) => prd.category == this.catList[catId - 1].name
    );
  }

  getFollowingProductId(currentid: number, direction: string): number {
    let idx = this.fullProductList.findIndex((ele) => {
      return ele.id == currentid;
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
}
