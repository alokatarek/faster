import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  baseUrl = 'adsense/'
  constructor(private _apiService: ApiService) { }
  addAdsense (body:Object ):Observable<any>{
    return this._apiService.post(`${this.baseUrl}addAdsense`,body)  
  }

  updateAdsense( body:Object ){
    return this._apiService.put(`${this.baseUrl}updateAdsense`,body)  
  }
  deleteAdsense(ids:number[]):Observable<any>{
   return this._apiService.delete(`${this.baseUrl}deleteAdsense`,{
      body:{id :ids}
    })
  }
  getAllAdsense(pageNumber?:number , pageSize?:number,SearchCriteria?:string, cityId? : number):Observable<any>{
    if(!pageNumber && !pageSize) return this._apiService.get(`${this.baseUrl}getAllAdsenses`)
   return this._apiService.get(`${this.baseUrl}getAllAdsenses?pageNumber=${pageNumber}&pageSize=${pageSize}&SearchCriteria=${SearchCriteria}&cityId=${cityId}`)
  }

  getAdsenseByID(id:number):Observable<any>{
    return this._apiService.get(`${this.baseUrl}getAdsenseByID/ID=${id}`)
  }
}

