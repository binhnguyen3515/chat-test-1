import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public signOut(userId:string): void {
    console.log(userId);
    window.localStorage.removeItem(userId);
  }

  public saveUser(userId: string):void{
    window.localStorage.removeItem(userId);
    window.localStorage.setItem(userId, userId);

  }
  public getUser(userId:string): any {
    const user = window.localStorage.getItem(userId);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveUserMessage(msg:string){
    
  }
}
