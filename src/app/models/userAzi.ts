export class UserAzi{
    id!:number;
    email!:string;
    phone!:string;
    token_firebase!:string;
    name!:string;
    status:string = "Offline";
    sockets!:any;
    online!:boolean;
}