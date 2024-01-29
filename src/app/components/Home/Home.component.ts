import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsComponent } from '../products/products.component';
import { OrderComponent } from '../order/order.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    OrderComponent,
    RouterOutlet,
  ],
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
