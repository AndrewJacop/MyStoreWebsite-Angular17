import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsComponent } from '../products/products.component';
import { OrderComponent } from '../order/order.component';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdsObsService } from '../../services/AdsObs.service';

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
  currentAd: string = '';
  constructor(private adsObs: AdsObsService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    let mySub = this.adsObs.myAdsSubscribtion().subscribe((data) => {
      // console.log(data);
      this.currentAd = data;
      let snackBarRef = this._snackBar.open(this.currentAd, 'X');
      snackBarRef.onAction().subscribe(() => {
        mySub.unsubscribe();
      });
    });
  }
}
