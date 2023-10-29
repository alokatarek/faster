import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'Login/';
  constructor(private _apiService: ApiService) {}

  login(userName: string, Password: string) {
    let formData = new FormData()

    formData.append('userName',userName)
    formData.append('Password',Password)
    // let connectionId = localStorage.getItem('connectionId')
    // formData.append('connectionId',connectionId!)
    return this._apiService.post(`${this.baseUrl}CustomerLogin`, formData);
  }
  isLogin(): boolean {
    // 
    const token = localStorage.getItem('token'); // get token from local storage
    if (!token) return false;
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    const dateInSeconds = Date.now() / 1000
    return parsedPayload.exp > dateInSeconds ; // check if token is expired
  }
}
