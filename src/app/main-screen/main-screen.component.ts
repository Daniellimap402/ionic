import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ContaService } from '../shared/conta.service';
import { DadosCadastraisService } from '../shared/dados-cadastrais.service';

import { Conta } from './conta';
import { DadosCadastrais } from './dados-cadastrais';

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
  contas : Conta[] = [];

  constructor(
    private menu: MenuController,
    private firebaseService: ContaService,
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
    console.log(conta);
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

    if (this.conta?.$key) {
      this.firebaseService.updateConta(this.conta.$key, this.conta);
      this.getContas();
    }
    else {
      this.firebaseService.createConta(this.conta);
      this.getContas();
    }
    this.form.reset();
    this.abrirModal = false;
    this.showContas = true;
  }
  
  private initForm(): void {
    this.form = this.fb.group({
      $key: [null],
      numero: [null, Validators.required],
      digito: [null, Validators.required],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      banco: [null, Validators.required],
      agencia: [null, Validators.required]
    });
  }

  async abrirMenuDadosCadastrais() {
    this.contas = [];
    this.showDadosCadastrais = true;
    this.showContas = false;
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    loading.present();
    this.dadosCadastraisService.getById(environment.idDadosCadastrais).snapshotChanges().subscribe(res => {
      loading.dismiss();
      let a = res.payload.toJSON();
      const dadosCadastrais = a as DadosCadastrais;
      this.dadosCadastrais = dadosCadastrais;
      this.dadosCadastrais.idade = this.calcularIdade(dadosCadastrais.dtNascimento);
      loading.dismiss();
    });

  }

  deleteItem(id: any){
    this.firebaseService.deleteConta(id);
    this.getContas();
  }


  async alertaConfirmacao(id: string) {
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
    let contas = this.firebaseService.getContas();
    contas.snapshotChanges().subscribe(res=> {
      this.contas = [];
      res.forEach(ct=> {
        let a = ct.payload.toJSON();
        a['$key'] = ct.key;
        this.contas.push(a as Conta);
      })})
      this.contas.reverse().pop();
  }

  async abrirMenuContas() {
    this.showContas = true;
    this.showDadosCadastrais = false;
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    loading.present();
    this.getContas();
    loading.dismiss();
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
