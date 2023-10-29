import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryCostService {
private basicUrl = 'storeDeliveryCost/'
  constructor(private _apiService:ApiService) { }

  getDeliveryCost(itemIds:number[],userAreaId:string){
    return this._apiService.post(`${this.basicUrl}totalDeliveryCost`,{userAreaId,itemIds})
  }
}
