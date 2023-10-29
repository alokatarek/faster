import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class StorePlacesService {
  baseUrl = 'storePlace/';
  constructor(private _apiService: ApiService) {}
  addStorePlace(body: Object): Observable<any> {
    return this._apiService.post(`${this.baseUrl}addStorePlace`, body);
  }

  updateStorePlace(body: Object) {
    return this._apiService.put(`${this.baseUrl}updateStore`, body);
  }
  deleteStorePlace(ids: number[]): Observable<any> {
    return this._apiService.delete(`${this.baseUrl}deleteStorePlace`, {
      body: { id: ids },
    });
  }
  getAllStorePlace(
    pageNumber?: number,
    pageSize?: number,
    storeTypeID?: number,
    cityId? : number
  ): Observable<any> {
    if (!pageNumber && !pageSize)
      return this._apiService.get(`${this.baseUrl}getAllStorePlace`);
    return this._apiService.get(
      `${this.baseUrl}getAllStorePlace?pageNumber=${pageNumber}&pageSize=${pageSize}&storeTypeID=${storeTypeID}&cityId=${cityId}`
    );
  }

  getDropDownListStorePlace(): Observable<any> {
    return this._apiService.get(`${this.baseUrl}dropDownListStore_place`);
  }

  getStorePlaceByID(id:number):Observable<any>{
    return this._apiService.get(`${this.baseUrl}GetStorePlaceyByID?ID=${id}`)
  }
}
