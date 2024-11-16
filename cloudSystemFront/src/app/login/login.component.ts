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
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username === 'UserTest' && password === '12345*A') {
        this.authService.login(); 
        this.router.navigate(['/home']);
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  validationLogin(){
    this.loginForm = this.fb.group({
      username: ['UserTest', Validators.required], 
      password: ['12345*A', Validators.required] 
    });
  }

}
