import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Customer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
baseUrl='Customer/'
  constructor(private _apiService:ApiService) { }

  addCustomer(body:Customer){
    return this._apiService.post(`${this.baseUrl}addCustomer`,body)
  }

  updateCustomer(body:Customer){
    this._apiService.post(`${this.baseUrl}updateCustomer`,body)
  }
}
