import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  
  constructor(private _apiService: ApiService) { }

  getDropDownListAreas(cityID:number):Observable<any>{
    return this._apiService.get(`Area/getDropDownList_area?cityID=${cityID}`)
  }

 getDropDownListCities(stateID:number):Observable<any>{
    return this._apiService.get(`City/getDropDownList_Cities?stateID=${stateID}`)
  }
  getDropDownListStates():Observable<any>{
    return this._apiService.get(`State/DropDownList_States`)
  }
}
