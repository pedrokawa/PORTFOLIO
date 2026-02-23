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
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', Validators.required]
    })

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
