import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Conta } from '../main-screen/conta';

@Injectable({
  providedIn: 'root'
})
export class DadosCadastraisService {

  constructor(private db: AngularFireDatabase) { }

  getById(id: string) {
    return this.db.object('/dados-cadastrais/' + id);
  }

}
