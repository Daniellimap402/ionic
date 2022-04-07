import { Component } from '@angular/core';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: Login = new Login();

  constructor(private loginService: LoginService) { }

  verificarCredenciasValidas(): void {
    this.loginService.getLogin().subscribe(res => {
      if (res === this.login) {
        console.log(true);
      } else {
        console.log(false);
        ;
      }
    });
  }

}
