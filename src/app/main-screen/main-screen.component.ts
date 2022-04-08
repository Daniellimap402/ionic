import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { DadosCadastrais } from './dados-cadastrais';
import { DadosCadastraisService } from './main-screen.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {

  showDadosCadastrais = false;
  dadosCadastrais = new DadosCadastrais();

  constructor(
    private menu: MenuController,
    private dadosCadastraisService: DadosCadastraisService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() { }

  abrirMenu() {
    console.log('entrou');
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async abrirMenuDadosCadastrais() {
    this.showDadosCadastrais = true;
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    loading.present();
    this.dadosCadastraisService.getDados().subscribe(res => {
      this.dadosCadastrais = res;
      this.dadosCadastrais.idade = this.calcularIdade(res.dtNascimento);
      loading.dismiss();
    });

  }

  calcularIdade(dtNascimento: any): number {
    const today = new Date();
    const birthDate = new Date(dtNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

}
