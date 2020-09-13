import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class HandlerService {

  constructor(private authService: AuthService,
              private router: Router) { }

  handleRequest(code: number) {
    if (code === 401) {
      this.authService.logout().subscribe((response: any) => {
        this.router.navigate(['/']);
      });
    }
  }
}
