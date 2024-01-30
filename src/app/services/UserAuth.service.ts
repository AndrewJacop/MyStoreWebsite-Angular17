import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;
  loggingState: BehaviorSubject<boolean>;
  constructor(private location: Location, private router: Router) {
    this.loggingState = new BehaviorSubject<boolean>(this.sLoginCheck());
  }

  sLogIn(email: string | null, password: string | null) {
    if (email == 'andrew@email.com' && password == '12345') {
      const token = 'akjsdvboi7q34ygpnbe8ihv7o';
      localStorage.setItem('token', token);
      this.isLoggedIn = true;
      this.loggingState.next(true);
    } else {
      alert('Wrong Login Data!');
    }
  }

  sLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.loggingState.next(false);
    this.router.navigate(['/home/welcome']);
  }

  sLoginCheck(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getLogState() {
    return this.loggingState.asObservable();
  }
}
