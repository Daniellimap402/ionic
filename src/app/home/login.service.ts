import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "./login";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    endpoint = "http://localhost:2002/";

    constructor(private http: HttpClient) { }

    getLogin(): Observable<Login> {
        return this.http.get<Login>(`${this.endpoint}login/`);
    }

}