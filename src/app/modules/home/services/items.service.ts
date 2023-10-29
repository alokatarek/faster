import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
catBaseUrl = 'ItemCategory/'
itemBaseUrl='Items/'
  constructor(private _apiService:ApiService) { }

  getAllCategory(storeId:number,pageNumber?:number , pageSize?:number):Observable<any>{

    if(!pageNumber && !pageSize) return this._apiService.get(`${this.catBaseUrl}ListItemCategoryOfStore?storeID=${storeId}`)
   return this._apiService.get(`${this.catBaseUrl}ListItemCategoryOfStore?storeID=${storeId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getAllItems(storeId:number,categoryId:number,pageNumber?:number , pageSize?:number){
    return this._apiService.get(`${this.itemBaseUrl}getItemsOfStore?storeID=${storeId}&catID=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

  }



}
