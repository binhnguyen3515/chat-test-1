import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  pluck,
  retry,
  shareReplay,
  Subscription,
  tap,
} from 'rxjs';
import { UserAzi } from '../models/userAzi';
import { SocketService } from '../services/socket.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatBox',{static: true})sendData!:any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private socket: SocketService,
    private router: Router,
  ) {
   
  }
  obs$!: Subscription;
  users$!: Observable<any>;
  yourId!:number;
  isChatWith = false;
  isChatWithFriendDataWhenLogin:any;
  ngOnInit() {
    this.obs$ = this.route.params.pipe(
      pluck('id'),
      tap((id) => {
        this.socket.connect(+id)
        this.yourId = id;
        this.users$ = this.socket.listFriendsOnline;
      }),
    ).subscribe();
  }

  chatWithId(f:any){
    if(f.id == this.yourId){
      return;
    }
    this.sendData = f;
    this.isChatWithFriendDataWhenLogin = f;
    this.isChatWith = true;
  }

  logout(){
    this.tokenStorageService.signOut(this.yourId.toString());
    this.socket.disconnect();
    this.router.navigate(['/login']);
    console.log(this.isChatWithFriendDataWhenLogin);
    
  }
  ngOnDestroy() {
    if (this.obs$) {
      this.obs$.unsubscribe();
    }
  }

}
