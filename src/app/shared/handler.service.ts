import { Injectable } from '@angular/core';
import {AuthService} from '../Auth/auth.service';

@Injectable()
export class HandlerService {

  constructor(private authService: AuthService) { }

  handleRequest(code: number) {
    if (code === 401) {
      this.authService.logout().subscribe((response: any) => {
        // this.router.navigate(['/']);
        window.location.href = '/';
      });
    }
  }
}
