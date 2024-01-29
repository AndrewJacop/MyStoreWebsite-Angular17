import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../models/IProduct';
import { CommonModule, Location } from '@angular/common';
import { GetProductsService } from '../../services/getProducts.service';
import { MyBorderDirective } from '../../directives/my-border.directive';
import { MyCCardDirective } from '../../directives/my-c-card.directive';
import { MatCardModule } from '@angular/material/card';
import { ICartItem } from '../../models/ICartItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MyBorderDirective,
    MyCCardDirective,
    MatCardModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Product List';
  prdList: IProduct[] = [];
  fPrdList: IProduct[] = [];
  cartList: ICartItem[] = [];
  total: number = 0;
  @Input() selectedCatId: number = 0;
  @Output() onUpdateCart: EventEmitter<{ c: ICartItem[]; t: number }> =
    new EventEmitter();

  constructor(
    private productsService: GetProductsService,
    private router: Router
  ) {}

  buy(id: number) {
    // Reduce Quantity
    if (Number(this.prdList[id - 1]['quantity']) > 0) {
      this.prdList[id - 1]['quantity'] =
        Number(this.prdList[id - 1]['quantity']) - 1;
      // Add to cart list
      let idx = this.cartList.findIndex(
        (e) => e.product == this.prdList[id - 1]
      );
      if (idx == -1) {
        this.cartList.push({
          product: this.prdList[id - 1],
          quantity: 1,
        });
      } else {
        this.cartList[idx].quantity = Number(this.cartList[idx].quantity) + 1;
      }
      this.updateCart();
    }
  }

  // randomNum() {
  //   return Math.random();
  // }

  ngOnInit(): void {
    this.updateLists();
  }

  updateLists(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.prdList = data;
      this.prdList.forEach((product) => {
        product['quantity'] = Math.floor(Math.random() * 10);
        product['available'] = product['quantity'];
      });
      this.fPrdList = this.prdList;
      // console.log(this.fPrdList);
      this.productsService.fullProductList = this.prdList;
    });
  }

  updateCart() {
    // Updating total
    this.total = this.cartList.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    // update cart
    this.onUpdateCart.emit({ c: this.cartList, t: this.total });
  }

  updateProductQuantity() {
    this.prdList.forEach((product) => {
      product['available'] = product['quantity'];
    });
  }

  ngOnChanges() {
    // update view
    if (this.selectedCatId == 0) {
      this.fPrdList = this.prdList;
    } else {
      this.fPrdList = this.productsService.getProductsByCatId(
        this.selectedCatId
      );
      // console.log(this.prdList);
    }
  }

  navToDetails(id: number) {
    this.router.navigate(['/home/product', id]);
  }
}
