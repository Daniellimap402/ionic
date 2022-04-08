import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DadosCadastrais } from "./dados-cadastrais";

@Injectable({
    providedIn: 'root'
})
export class DadosCadastraisService {
    endpoint = "http://localhost:2002/";

    constructor(private http: HttpClient) { }

    getDados(): Observable<DadosCadastrais> {
        return this.http.get<DadosCadastrais>(`${this.endpoint}dados-cadastrais/`);
    }

}