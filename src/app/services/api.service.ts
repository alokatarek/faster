import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get(endPoint: string, options?: object): Observable<any> {
    return this.http.get<any>(this.baseUrl + endPoint, options);
  }

  post(endPoint: string, body: object, options?: object): Observable<any> {
    return this.http.post<any>(this.baseUrl + endPoint, body, options);
  }

  put(endPoint: string, body: object, options?: object): Observable<any> {
    return this.http.put<any>(this.baseUrl + endPoint, body, options);
  }

  // formDataFunction(body: any) {
  //   for (const key in body) {
  //     this.formDataBody.append(key, body[key]);
  //     console.log(key , body[key]);
      
  //   }
  //   console.log(this.formDataBody);

  // }
  postFormData(endPoint: string, body: any, options?: object): Observable<any> {
   let formDataBody = new FormData();
   for (const key in body) {
    formDataBody.append(key, body[key]);
    console.log(key , body[key]);
    
  }
    // this.formDataFunction(body);
    return this.http.post<any>(
      this.baseUrl + endPoint,
      formDataBody,
      options
    );
  }

  putFormData(
    endPoint: string,
    body: any,
    options?: object
  ): Observable<any> {
    let formDataBody = new FormData()
    for (const key in body) {
      formDataBody.append(key, body[key]);
      console.log(key , body[key]);
      
    } 
    // this.formDataFunction(body);
    return this.http.put<any>(
      this.baseUrl + endPoint,
      formDataBody,
      options
    );
  }
  delete(endPoint: string, options?: object): Observable<any> {
    return this.http.delete<any>(this.baseUrl + endPoint, options);
  }
}
