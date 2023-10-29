import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AddOrder } from '../interfaces/add-order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'orders/';
  public imagesOfItems: any = [];
  constructor(private _apiService: ApiService) {}

  addOrder(body: AddOrder) {
    let formDataBody = new FormData();
    if (body.payedUp) formDataBody.append('payedUp', body.payedUp);
    formDataBody.append('areasId', body.areasId.toString());
    formDataBody.append('customerId', body.customerId);
    formDataBody.append('fullAddress', body.fullAddress);
    body.items.map((item: any, index: number) => {
      formDataBody.append('items', JSON.stringify(item));
    });

    return this._apiService.post(`${this.baseUrl}addOrders`, formDataBody);
  }

  uploadImageForItems(imageFile: any) {
    let formDataBody = new FormData();
    formDataBody.append('image', imageFile);
    return this._apiService.post(
      `${this.baseUrl}UpdateItemImage`,
      formDataBody
    );
  }
  getAllCustomerOrders(customerId: string) {
    let headers = new HttpHeaders({
      customerID: customerId,
    });

    return this._apiService.get(`${this.baseUrl}GetOrderByCustomerID?`, {
      headers,
    });
  }

  getOrderItems(cipheredOrderId: string) {
    const cipheredOrderID = new HttpHeaders().set(
      'cipheredOrderID',
      cipheredOrderId
    );
    // const cipheredOrderID = new HttpHeaders().set('cipheredOrderID',cipheredOrderId)
    return this._apiService.get(`${this.baseUrl}getOrderItems`, {
      headers: cipheredOrderID,
    });
  }
  deleteOrder(orderId: string) {
    let headers = new HttpHeaders({
      cipheredOrderID: orderId,
    });
    return this._apiService.delete(`${this.baseUrl}deleteOrders`, {
      headers,
    });
  }
  getOldOrderAddresses(customerId: string, areaId: string) {
    //
    let queryString = new HttpParams();
    let headers = new HttpHeaders({
      customerID: customerId,
    });

    // queryString= queryString
    //   .append('CustomerID', y)
    queryString = queryString.append('CurrentAreaID', areaId);
    return this._apiService.get(`${this.baseUrl}GetOldOrderAddresses`, {
      params: queryString,
      headers,
    });
  }

  // veichle types
  getDropDownListVehiclesTypes(): Observable<any> {
    let vehiclesTypesBaseURL = 'VehiclesTypes/';
    return this._apiService.get(
      `${vehiclesTypesBaseURL}getDropDownList_VehicleType`
    );
  }

  addShipmentOrder(shipmentData: object): Observable<any> {
    return this._apiService.post(
      `${this.baseUrl}AddShipmentOrder`,
      shipmentData
    );
  }

  rejectShipmentAdmin(orderID: object): Observable<any> {
    return this._apiService.post(`${this.baseUrl}shipmentAdminReject`, orderID);
  }

  SendShipmentOfferPrice(shipmentData: any): Observable<any> {
    const cipheredOrderID = new HttpHeaders().set(
      'cipheredOrderID',
      shipmentData.cipheredOrderID
    );
    const params = new HttpParams()
      .set('price', shipmentData.price)
      .set('vehicleTypesId', shipmentData.vehiclesTypesId);

    return this._apiService.post(
      `${this.baseUrl}shipmentSendOfferPrice`,
      {},
      {
        params,
        headers: cipheredOrderID,
      }
    );
  }

  shipmentClientAccept(requestBody: any): Observable<any> {
    return this._apiService.post(`${this.baseUrl}shipmentClientAccept`, {
      isAccept: requestBody.isAccept,
      cipheredOrderID: requestBody.cipheredOrderID,
      rejectReason: requestBody.rejectReason,
    });
  }
}
