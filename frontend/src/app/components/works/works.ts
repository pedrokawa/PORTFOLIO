import { Component } from '@angular/core';
@Component({
  selector: 'app-works',
  imports: [],
  templateUrl: './works.html',
  styleUrl: './works.css',
})
export class Works {

  abaAtiva: string = 'aba1';

  mudarAba(novaAba: string){
    this.abaAtiva = novaAba;
  }
}
