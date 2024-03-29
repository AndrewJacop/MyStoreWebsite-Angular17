import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { HomeComponent } from './components/Home/Home.component';
import { AboutUsComponent } from './components/AboutUs/AboutUs.component';
import { ContactUsComponent } from './components/ContactUs/ContactUs.component';
import { ProductDetailsComponent } from './components/ProductDetails/ProductDetails.component';
import { LoginComponent } from './components/login/login.component';
import { orderAuthGuard } from './guards/orderAuth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/welcome', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        component: OrderComponent,
        canActivate: [orderAuthGuard],
      },
      { path: 'about', component: AboutUsComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'add', component: DashboardComponent },
      { path: 'edit/:id', component: DashboardComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
