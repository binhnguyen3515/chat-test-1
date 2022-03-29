import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit,OnChanges {
  @Input()getData!: any;
  @Input()getYourId!:any;
  @Input()getList$!:Observable<any>;
  formChat = this.fb.group({
    message:['']
  })
  friendData:any;
  chatList:any[]=[];
  constructor(private tokenStorageService:TokenStorageService,
    private router:Router,private socket:SocketService,
    private fb:FormBuilder) { }
  
  ngOnInit() {
    this.getMessage().subscribe();
  }
  
  ngOnChanges(changes: any): void {
    this.friendData = changes.getData.currentValue;
    this.chatList = []
  }

  sendMsg(msg:string){
    console.log(this.chatList);
    
    console.log(msg.trim());
    this.socket.sendMessage(this.friendData.id,msg);

    this.chatList.push({roomId:+this.friendData.id,message:this.message?.value,id:+this.getYourId});

      // get last element of chatlist
      let currentMessage = this.chatList.slice(-1).pop();
      let sendContentTemp = {roomId:+this.friendData.id,message:this.message?.value,id:+this.getYourId};
      if(currentMessage.id == sendContentTemp.id){
        // remove last element from chatList
        this.chatList.pop();
      }

      this.formChat.reset();
  }

  getMessage(){
    return this.socket.getMessage.pipe(
      tap((e)=>console.log(e)),
      map((data:any) =>{
        this.chatList.push(data);
      })
    )
  }

  get message(){return this.formChat.get('message')};
}
