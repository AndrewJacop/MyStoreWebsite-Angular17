import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { HomeComponent } from './components/Home/Home.component';
import { AboutUsComponent } from './components/AboutUs/AboutUs.component';
import { ContactUsComponent } from './components/ContactUs/ContactUs.component';
import { ProductDetailsComponent } from './components/ProductDetails/ProductDetails.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'products', component: OrderComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
