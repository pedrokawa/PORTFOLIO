import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Contato {
  private apiUrl = 'http://localhost:3000/api/contato';

  constructor(private http: HttpClient){}

    enviarContato(
      dados: 
      { 
      nome: string,
      email: string, 
      mensagem: string 
    }): Observable<any>{
        return this.http.post(this.apiUrl, dados);
      }
}

