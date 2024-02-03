import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ICategory } from '../../models/ICategory';
import { GetProductsService } from '../../services/getProducts.service';
import { IProduct } from '../../models/IProduct';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  catList: ICategory[] = [] as ICategory[];
  prd: IProduct = {} as IProduct;
  currentId: number | null = null;

  constructor(
    private getProductsService: GetProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProductsService.getAllCategories().subscribe((data) => {
      this.catList = data;
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.currentId = Number(params['id']);
        // console.log(this.currentId);
        this.getProductsService
          .getProductsById(this.currentId)
          .subscribe((data) => {
            this.prd = data;
          });
      }
    });
  }

  onSubmit() {
    // console.log(this.prd);
    if (!this.currentId) {
      this.prd.id = this.getProductsService.getNextId();
      this.prd.available = this.prd.quantity;
      this.prd.image =
        'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';
      this.getProductsService.addNewProduct(this.prd).subscribe((data) => {
        // console.log(data);
      });
    } else {
      this.getProductsService
        .editProductById(this.currentId, this.prd)
        .subscribe((data) => {
          // console.log(data);
        });
    }
    alert('Submitted Succesfully');
    this.router.navigate(['/home/products']);
  }
}
