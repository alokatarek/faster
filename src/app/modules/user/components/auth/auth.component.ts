import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  x = 'test<br> test2'
  loginForm: FormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  signUpForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    address: [''],
    notes: [''],
  });
  isLoading: boolean = false;
  isDisplayErrorAlert: boolean = false;
  previousUrl: string =''; 
  isDisplayErrorAlertForSignUp: boolean = false;
  signUpErrorMessage: string = '';
  loginErrorMessage: string='';
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _customerService: CustomerService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute,
    private _location:Location
  ) {
    // this._activatedRoute.queryParams.subscribe(q)
    
  }

  ngOnInit(): void {}

  submitLogin() {
    if (!this.loginForm.valid) return;
    // 
    const userName = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;
    this.isLoading = true;
    this.isDisplayErrorAlert = false;
    this._authService.login(userName, password).subscribe({
      next: (res: any) => {
        // 
        if (res.result === 1) {
          
          let userData = {
            fullName : res.data.userFullName,
            userName : res.data.user_name
          }
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.user_name);
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('userId', res.data.userID);
          localStorage.setItem('userSignalId', res.data.userSignlId);
          localStorage.setItem('userType', res.data.loginType);

          this._location.back()

          this._router.navigate(['/home']);
        } else {
          this.isLoading = false;
          this.isDisplayErrorAlert = true;
          this.loginErrorMessage = res.note

          console.log(res);
        }
      },
    });
  }
  submitSignUp() {
    // 
    if (!this.signUpForm.valid) return;
    
    this.isDisplayErrorAlertForSignUp = false;
    this.isLoading = true;
    this._customerService.addCustomer(this.signUpForm.value).subscribe({
      next: (res: any) => {

        let userData = {
          fullName : res.data.userFullName,
          userName : res.data.user_name
        }
        // 
        if (res.result === 1) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.user_name);
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('userId', res.data.userID);

          this._router.navigate(['/home']);
        } else {
          this.isDisplayErrorAlertForSignUp = true
          this.isLoading = false;
          this.signUpErrorMessage = res.note

          console.log(res);
        }
      },
    });
  }

  isLoginToggle() {
    this.isLogin = !this.isLogin;
  }
}
