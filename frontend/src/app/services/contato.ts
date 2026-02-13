import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class Contato {
  private apiUrl = `${environment.apiUrl}/contato`;

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

