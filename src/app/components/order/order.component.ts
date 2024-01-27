import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { MyCCardDirective } from '../../directives/my-c-card.directive';
import { MyBorderDirective } from '../../directives/my-border.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../models/ICategory';
import { ICartItem } from '../../models/ICartItem';
import { CcPipePipe } from '../../pipes/cc-pipe.pipe';
import { NidDatePipePipe } from '../../pipes/nid-date-pipe.pipe';

@Component({
  selector: 'app-order',
  imports: [
    ProductsComponent,
    FormsModule,
    CommonModule,
    MyBorderDirective,
    MyCCardDirective,
    CcPipePipe,
    NidDatePipePipe,
  ],
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  filterList: ICategory[];
  cartList: ICartItem[] = [];
  catFilterId: number = 0;
  creditCardNumber: string = '';
  NationalIdNumber: string = '';
  @ViewChild(ProductsComponent) prdCm!: ProductsComponent;
  total: number = 0;

  constructor() {
    this.filterList = [
      { id: 1, name: 'electronics' },
      { id: 2, name: 'jewelery' },
      { id: 3, name: "men's clothing" },
      { id: 4, name: "women's clothing" },
    ];
  }

  updateCart(cObj: { c: ICartItem[]; t: number }) {
    this.cartList = cObj.c;
    this.total = cObj.t;
  }

  deleteAllItem(idx: number) {
    this.prdCm.cartList.splice(idx, 1);
    this.prdCm.updateCart();
  }
  deleteOneItem(idx: number) {
    if (this.prdCm.cartList[idx].quantity > 1) {
      this.prdCm.cartList[idx].quantity = this.prdCm.cartList[idx].quantity - 1;
      this.prdCm.updateCart();
    } else {
      this.deleteAllItem(idx);
    }
  }

  checkOut() {
    this.prdCm.cartList = [];
    this.prdCm.total = 0;
    this.prdCm.updateCart();
    this.prdCm.updateProductQuantity();
  }
}
