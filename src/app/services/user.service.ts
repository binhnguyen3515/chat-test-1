import { Injectable } from '@angular/core';
import { defaultIfEmpty, distinctUntilChanged, filter, map, mergeMap, Observable, shareReplay, tap, toArray } from 'rxjs';
import { GlobalUrl } from '../common/api';
import { UserAzi } from '../models/userAzi';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private rest:RestApiService) { }

  get getUsers():Observable<any>{
    return this.rest.get(GlobalUrl.User.getAll);
  }

  getByField(field:any){

    return this.getUsers.pipe(
      mergeMap((data:any)=>data as UserAzi[]),
      map((data:any)=>{
        return {[field]:data[field]}
      }),
      toArray(),
    )
  }

  getUserById(id:number){
    return this.getUsers.pipe(
      distinctUntilChanged(),
      mergeMap((data:any)=>data as UserAzi[]),
      filter((data:UserAzi)=>data.id === id),
      tap((e)=>console.log(e)),
      shareReplay(),
      defaultIfEmpty('empty'),
    );
  }
}
