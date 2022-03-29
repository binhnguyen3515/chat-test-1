import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
@Injectable()
export class SocketApp extends Socket {
  constructor() {
    super({ url: 'http://104.156.250.45:1998/app', options:{
      autoConnect : false
    }});
    
  }
  Connect(id:number){
    this.ioSocket.io.opts.query={id:id};
    this.ioSocket.io.uri="http://104.156.250.45:1998/app";
    this.connect();
  }
  Disconnect(){
    this.disconnect();
  }

}
@NgModule({
  declarations: [		
    AppComponent,
      LoginComponent,
      ChatComponent,
      ChatBoxComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule,
    ReactiveFormsModule,
  ],
  providers: [SocketApp],
  bootstrap: [AppComponent]
})
export class AppModule { }
