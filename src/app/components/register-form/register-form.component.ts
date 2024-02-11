import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  userRegForm: FormGroup;
  name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-z]+'),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
  ]);
  address = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern('([0-9]){5}'),
    ]),
  });
  phones = new FormArray([new FormControl('')]);

  constructor(private router: Router) {
    this.userRegForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      phones: this.phones,
    });
  }

  getNameErrorMessage() {
    return this.name.hasError('required')
      ? 'You must enter a value'
      : this.name.hasError('pattern')
      ? 'Not a valid Name'
      : '';
  }
  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  getPassErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('minLength')
      ? 'Your password must be at least 7 characters'
      : '';
  }
  get zip() {
    return this.address.get('zip');
  }
  addPhone() {
    this.phones.push(new FormControl(''));
  }

  removePhone(id: number) {
    this.phones.removeAt(id);
  }
  submitForm() {
    confirm(`Welcome ${this.name.value!}, Glad to have you with us!`);
    this.router.navigate(['/home/welcome']);
  }
}
