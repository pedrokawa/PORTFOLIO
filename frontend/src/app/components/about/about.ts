import { Component } from '@angular/core';
import { currentYear } from '../../utils/currentYear';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  anoAtual: number = currentYear() - 2011;

  irParaSecao(idSecao: string){
    const elemento = document.getElementById(idSecao);
    if(elemento){
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }

}
