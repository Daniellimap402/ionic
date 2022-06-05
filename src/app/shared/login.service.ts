import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Login } from '../home/login';
import { Conta } from '../main-screen/conta';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase) { }

getLogin() {
  const listDados = this.db.list('/login');
  return listDados;
}

getById(id: string) {
  return this.db.object('/login/' + id);
}

}