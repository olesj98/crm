import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  // TODO login with token - if error -> throw on login page, delete token, logout
  ngOnInit() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.authService.setToken(token);
    }
  }
}
