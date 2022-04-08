import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Login } from './login';
import { LoginService } from './login.service';

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
    this.loginService.getLogin().subscribe(async res => {
      loading.dismiss();
      if (res.usuario === this.login.usuario && res.senha === this.login.senha) {
        this.route.navigateByUrl('/main');
      } else {
        await this.apresentarErroCredenciais();
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
