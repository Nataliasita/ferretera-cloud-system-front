import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = new BehaviorSubject<boolean>(false); // Inicialmente no autenticado

  isAuthenticated() {
    return this.authenticated.asObservable();
  }

  login() {
    this.authenticated.next(true);
  }

  logout() {
    this.authenticated.next(false); 
  }
}
