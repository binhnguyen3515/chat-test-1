import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = `Error: ${error.error.error.message}`;
    } else {
      //Server side error
      errorMessage = `Error code: ${error.status} - Message: ${error.message}`;
    }
    // console.error(errorMessage);
    return of(new Error(errorMessage));
  }

  get(url: string){
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }

  getOne(url:string,id:string){
    console.log("url: "+url);
      return this.httpClient.get(url+'/'+id).pipe(catchError(this.handleError));
  }

  post(url:string,body:any){
      return this.httpClient.post(url,body).pipe(catchError(this.handleError));
  }

  put(url:string,body:any,id:string|number){
    return this.httpClient.put(url+'/'+id,body).pipe(catchError(this.handleError));
  }

  delete(url:string,id:string|number){
    return this.httpClient.delete(url+'/'+id).pipe(catchError(this.handleError));
  }
}
