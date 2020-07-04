import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient, private router: Router) { }

  public authenticate(user: any): Observable<any> {
    return this.htpp.post('http://localhost:3000/auth/authenticate', {
      user: user
    });
  }
  public verifyRoutes() {
    let roles: any = localStorage.getItem('roles');
    if (roles === 'admin') {
      this.router.navigateByUrl('/admin')
      console.log('admin')
    } else {
      this.router.navigateByUrl('/student')
      console.log('sust')
    }
  }

  public logout() {
    localStorage.removeItem('i9-token');
    localStorage.removeItem('roles')
    this.router.navigateByUrl('/auth')
  }
  public isAuthenticated(): boolean {
    if (localStorage.getItem('i9-token') !== null && localStorage.getItem('i9-token') !== '' && localStorage.getItem('roles') !== null && localStorage.getItem('roles') !== '') {
      return true;
    } else {
      this.router.navigateByUrl('/auth')
      return false;

    }
  }
}
