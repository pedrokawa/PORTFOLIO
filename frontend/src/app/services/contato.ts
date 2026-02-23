import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Contato{
  nome: string;
  email: string;
  mensagem: string;
}
@Injectable({
  providedIn: 'root',
})

export class Contato {
  private apiUrl = `${environment.apiUrl}/contato`;

  constructor(private http: HttpClient){}

    enviarContato(dados: Contato): Observable<Contato>{
        return this.http.post<Contato>(this.apiUrl, dados);
      }
}

