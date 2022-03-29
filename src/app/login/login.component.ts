import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private tokenStorageService:TokenStorageService) { }

  ngOnInit() {
  }
  login(value:any):void {
    this.tokenStorageService.saveUser(value);
    this.router.navigate(['/chat',+value]);
  }
}
