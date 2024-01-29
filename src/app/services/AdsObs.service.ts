import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdsObsService {
  adsList: string[];
  constructor() {
    this.adsList = [
      'Discover the latest trends in fashion! Shop now for exclusive deals.',
      'Upgrade your tech game with our latest gadgets. Limited stock available!',
      'Revamp your home with our stylish furniture collection. Affordable prices, premium quality.',
      'Get fit and healthy with our fitness essentials. Start your wellness journey today!',
      'Unleash your creativity! Explore our arts and crafts supplies for your next project.',
      'Satisfy your sweet tooth with our delectable desserts. Order now for a taste of happiness!',
      'Stay cozy and stylish with our winter fashion collection. Warm up to great deals!',
      'Transform your space with our home decor. Elevate your living experience.',
      'Fuel your passion for reading. Explore our vast collection of books for all ages.',
      'Make mealtime memorable with our gourmet food selection. Delight your taste buds!',
    ];
  }

  myAdsSubscribtion() {
    return new Observable<string>((observer) => {
      let inv = setInterval(() => {
        observer.next(
          this.adsList[Math.floor(Math.random() * this.adsList.length)]
        );
      }, 5000);
      return {
        unsubscribe() {
          clearInterval(inv);
        },
      };
    });
  }
}
