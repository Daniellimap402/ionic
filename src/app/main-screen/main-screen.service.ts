import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DadosCadastrais } from "./dados-cadastrais";
import { Conta } from "./conta";

@Injectable({
    providedIn: 'root'
})
export class DadosCadastraisService {
    endpoint = "http://localhost:2002/";

    constructor(private http: HttpClient) { }

    getDados(): Observable<DadosCadastrais> {
        return this.http.get<DadosCadastrais>(`${this.endpoint}dados-cadastrais/`);
    }

    getContas(): Observable<Conta[]> {
        return this.http.get<Conta[]>(`${this.endpoint}contas/`);
    }

    deleteConta(id: number): Observable<any> {
        return this.http.delete(`${this.endpoint}contas/` + id);
    }

    addConta(conta: Conta): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        console.log(conta);
        
        return this.http.post(`${this.endpoint}contas/`, JSON.stringify(conta), httpOptions);
    }
    
    updateConta(conta: Conta): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.endpoint}contas/` + conta.id, JSON.stringify(conta), httpOptions);
    }
}