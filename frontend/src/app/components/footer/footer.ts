import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contato } from '../../services/contato';
import { CommonModule } from '@angular/common';
import { currentYear } from '../../utils/currentYear';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  mostraToastSucesso = signal(false);
  mostraToastErro = signal(false);

  exibirToastSucesso(){
    this.mostraToastSucesso.set(true);

    setTimeout(() => {
      this.mostraToastSucesso.set(false);
    }, 2800);
  }

  exibirToastErro(){
    this.mostraToastErro.set(true);

    setTimeout(() => {
      this.mostraToastErro.set(false);
    }, 2800);

  }

  meuFormulario: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private Contato: Contato
  ){
    this.meuFormulario = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.minLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', Validators.required]
    })

  }
  // mascara para telefone 
  maskTel(event: any){
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if(valor.length > 11) {
      valor = valor.substring(0 , 11);
    }

    if (valor.length === 0) {
          event.target.value = '';
        } else if (valor.length <= 2) {
          event.target.value = `(${valor}`;
        } else if (valor.length <= 6) {
          event.target.value = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        } else if (valor.length <= 10) {
          event.target.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
        } else {
          event.target.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
    }

    this.meuFormulario.get('telefone')?.setValue(event.target.value, { emitEvent: false});
  }



  // enviar
  enviar(){
    if (this.meuFormulario.valid){
      const dados = this.meuFormulario.value;

      this.Contato.enviarContato(dados).subscribe({
        next: (res) => {
          this.exibirToastSucesso();
          this.meuFormulario.reset();
        },

        error: (err) => {
          this.exibirToastErro();
        }
      })
    } else {
      this.exibirToastErro();
    }
  }

  anoAtual: number = currentYear();

}
