import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductsService } from '../../services/getProducts.service';
import { IProduct } from '../../models/IProduct';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ProductDetails',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentId: number = 0;
  currentProduct: IProduct | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: GetProductsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = Number(params['id']);
      // console.log(this.currentId);
      this.currentProduct = this.productService.getProductsById(this.currentId);
    });
  }
  ngOnChanges() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = Number(params['id']);
      // console.log(this.currentId);
    });
    this.currentProduct = this.productService.getProductsById(this.currentId);
  }

  goBack() {
    this.location.back();
  }

  navToNextItem(direction: string) {
    const newid = this.productService.getFollowingProductId(
      this.currentId,
      direction
    );
    this.router.navigateByUrl(`/home/product/${newid}`);
  }
}
