import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Conta } from '../main-screen/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private db: AngularFireDatabase) { }

  createConta(conta: Conta) {
    const listConta = this.db.list('/conta');
    console.log(listConta);
    
    const size = listConta.auditTrail.length;
    return listConta.push({
      numero: conta.numero,
      digito: conta.digito,
      agencia: conta.agencia,
      banco: conta.banco,
      cidade: conta.cidade,
      estado: conta.estado
    });
}

getContas() {
    const listConta = this.db.list('/conta');
    return listConta;
}

deleteConta(id: string) {
  console.log(id);
  
  const listConta = this.db.object('/conta/' + id);
  listConta.remove();
}

updateConta(id: string,conta: Conta) {
  const listConta = this.db.object('/conta/' + id);
  return listConta.update({
    numero: conta.numero,
    digito: conta.digito,
    agencia: conta.agencia,
    banco: conta.banco,
    cidade: conta.cidade,
    estado: conta.estado
  })
}

getDados() {
  const listDados = this.db.list('/dados-cadastrais');
  return listDados;
}

}
