import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder,) {
    this.validationLogin();
  }

  ngOnInit(): void {

  }

  stateLogin(){
    if (this.username === 'usuario' && this.password === 'contraseña') {
      this.authService.login(); // Cambia el estado a autenticado
      this.router.navigate(['/home']); // Redirige a la página de inicio u otra página segura
    } else {
      console.log('Credenciales incorrectas');
    }
  }

  validationLogin(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }

}
