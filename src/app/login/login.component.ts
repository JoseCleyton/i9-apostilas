import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public status: boolean;
  public message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  public authenticate() {
    this.status = true;
    this.message = 'Aguarde...'
    let user = {
      login: this.formLogin.value.login,
      password: this.formLogin.value.password
    }

    this.authService.authenticate(user).subscribe(
      (data) => {
        localStorage.setItem('i9-token', data.token);
        localStorage.setItem('roles', data.roles);
        this.authService.verifyRoutes();
        this.status = false
      },
      () => {
        this.message = 'Erro na solicitação !!! \n Verifique as credenciais....'
        this.status = false;
      }
    )
  }
}
