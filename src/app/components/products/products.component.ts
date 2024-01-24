import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { CommonModule } from '@angular/common';
import { GetProductsService } from '../../services/getProducts.service';
import { MyBorderDirective } from '../../directives/my-border.directive';
import { MyCCardDirective } from '../../directives/my-c-card.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, MyBorderDirective, MyCCardDirective],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Product List';
  prdList: IProduct[] = [];
  catFilterId: number = 0;
  catList: ICategory[];
  constructor(private productsService: GetProductsService) {
    this.catList = [
      { id: 1, name: 'electronics' },
      { id: 2, name: 'jewelery' },
      { id: 3, name: "men's clothing" },
      { id: 4, name: "women's clothing" },
    ];
  }

  buy(id: number) {
    if (Number(this.prdList[id - 1]['quantity']) > 0) {
      this.prdList[id - 1]['quantity'] =
        Number(this.prdList[id - 1]['quantity']) - 1;
    }
  }

  randomNum() {
    return Math.random();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.prdList = data;
      this.prdList.forEach((product) => {
        product['quantity'] = Math.floor(Math.random() * 10);
      });
      // console.log(this.prdList);
    });
  }
}
