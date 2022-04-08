import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Conta } from './conta';
import { DadosCadastrais } from './dados-cadastrais';
import { DadosCadastraisService } from './main-screen.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {

  showDadosCadastrais = false;
  abrirModal = false;
  dadosCadastrais = new DadosCadastrais();
  form: FormGroup;

  conta: Conta = new Conta();
  showContas= false;
  contas = [new Conta];

  constructor(
    private menu: MenuController,
    private dadosCadastraisService: DadosCadastraisService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public fb: FormBuilder
  ) { this.initForm() }

  ngOnInit() {}

  abrirMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openModal(conta?: Conta){
    this.form.patchValue(conta);
    this.conta = conta;
    this.abrirModal = true;
  }

  fecharModal() {
    this.abrirModal = false;
    this.form.reset();
  }

  salvar() {
    this.conta = this.form.getRawValue();

    if (this.conta?.id) {
      this.dadosCadastraisService.updateConta(this.conta).subscribe(() => {
        this.getContas();
      })
    }
    else {
      this.dadosCadastraisService.addConta(this.conta).subscribe(() => {
        this.getContas();
      })
    }
    this.form.reset();
    this.abrirModal = false;
    this.showContas = true;
  }
  
  private initForm(): void {
    this.form = this.fb.group({
      id: [null],
      numero: [null, Validators.required],
      digito: [null, Validators.required],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      banco: [null, Validators.required],
      agencia: [null, Validators.required]
    });
  }

  async abrirMenuDadosCadastrais() {
    this.contas = [new Conta];
    this.showDadosCadastrais = true;
    this.showContas = false;
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

  deleteItem(id: any){
    this.dadosCadastraisService.deleteConta(id).subscribe( () => {
      this.getContas();
    });
  }


  async alertaConfirmacao(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja realmente excluir esta conta?',
      buttons: [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        handler: () => {
          this.deleteItem(id);
        }
      }
      ]
    });
    await alert.present();
  }


  getContas(){
    this.dadosCadastraisService.getContas().subscribe(res => {
      this.contas = [new Conta];
      res.forEach(ct=> {
        this.contas.push(ct);
      })
      this.contas.reverse().pop();
    });
  }

  async abrirMenuContas() {
    this.showContas = true;
    this.showDadosCadastrais = false;
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    loading.present();
    this.dadosCadastraisService.getContas().subscribe(res => {
      console.log(res);
      res.forEach(ct=> {
        this.contas.push(ct);
      })
      this.contas.reverse().pop();
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
