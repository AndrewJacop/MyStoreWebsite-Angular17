import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../services/UserAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailInput = new FormControl('');
  passInput = new FormControl('');
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {}
  logMeIn() {
    this.userAuthService.sLogIn(
      this.emailInput.getRawValue(),
      this.passInput.getRawValue()
    );
    const redirectUrl = this.userAuthService.redirectUrl || '/home';
    this.router.navigate([redirectUrl]);
  }
}
