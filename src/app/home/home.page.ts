import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoginService } from '../shared/login.service';
import { Login } from './login';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: Login = new Login();

  constructor(
    private loginService: LoginService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: Router
  ) { }

  async verificarCredenciasValidas(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    loading.present();
    this.loginService.getById(environment.idLogin).snapshotChanges().subscribe(res => {
      loading.dismiss();
      let a = res.payload.toJSON();
      const user = a as Login;
      if (user.usuario === this.login.usuario && user.senha === this.login.senha) {
        this.route.navigateByUrl('/main');
      } else {
        this.apresentarErroCredenciais();
      }
    });
  }


  private async apresentarErroCredenciais() {
    const toast = await this.toastController.create({
      message: 'As credenciais são inválidas.',
      duration: 2000
    });
    toast.present();
  }
}
