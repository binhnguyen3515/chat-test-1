import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, shareReplay, Subject, tap } from 'rxjs';
import { SocketApp } from '../app.module';
import { UserAzi } from '../models/userAzi';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public isServerConnected$: Subject<string> = new Subject();

  constructor(private socket:SocketApp) { }

  isServerConnected(){
    this.socket.on('connect_error',(message:any) => {
      this.isServerConnected$.next("no internet connection");
    })
    this.socket.on('connect',(message:any) => {
      this.isServerConnected$.next("status is fine");
    })
    return this.isServerConnected$.asObservable();
  }

  connect(id: number) {
    this.socket.Connect(id);
  }
  disconnect() {
    this.socket.Disconnect();
  }

  get listFriendsOnline() {
    return this.socket.fromEvent('friends').pipe(
      filter((e:any)=>e[0]!=='undefined'),
      distinctUntilChanged(),
      map((data:any)=>data as UserAzi[]),
      shareReplay(),
      tap((e)=>console.log(e)),
    ) 
  };

  sendMessage(roomId: string, msg: string) {
    // console.log('roomId:' + roomId + ' --- ' + 'msg:' + msg);
    let date = moment().format('HH:mm, DD/MM/YYYY');
    let sendContent = {
      roomId: +roomId,
      msg: {
        type: 'send',
        message: msg,
        time: date.toString(),
        image_urls: [],
      },
    };
    this.socket.emit('chat-friend', sendContent);
  }

  get getMessage(){
    return this.socket.fromEvent('chat-friend').pipe(
      distinctUntilChanged(),
      filter((data)=>data!==undefined),
      map((data:any)=>{
        return{
          roomId:+data.roomId,
          message:data?.msg?.message,
          id:data.senderId,
        }
      }))
  }

}
