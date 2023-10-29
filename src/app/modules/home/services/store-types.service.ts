import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreTypesService {

  baseUrl = 'storeType/'
  constructor(private _apiService: ApiService) { }
  addStoreType (body:Object ):Observable<any>{
    return this._apiService.post(`${this.baseUrl}addStoreType`,body)  
  }

  updateStoreType( body:Object ){
    return this._apiService.put(`${this.baseUrl}updateStoreType`,body)  
  }
  deleteStoreType(ids:number[]):Observable<any>{
   return this._apiService.delete(`${this.baseUrl}deleteStoreType`,{
      body:{id :ids}
    })
  }
  getAllStoreType(pageNumber?:number , pageSize?:number,searchCriteria?:string):Observable<any>{

    if(searchCriteria) return this._apiService.get(`${this.baseUrl}getAllStoreType?pageNumber=${pageNumber}&pageSize=${pageSize}&searchCriteria=${searchCriteria}`)
    return this._apiService.get(`${this.baseUrl}getAllStoreType?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getDropDownListStoreType():Observable<any>{ 
    return this._apiService.get(`${this.baseUrl}getDropDownListStoreType`)
  }
  
  getStoreTypeByID(id:number):Observable<any>{
    return this._apiService.get(`${this.baseUrl}getStoreTypeByID?id=${id}`)
  }
 
}
