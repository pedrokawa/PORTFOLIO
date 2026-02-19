import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contato } from '../../services/contato';
import { CommonModule } from '@angular/common';
import { email } from '@angular/forms/signals';
import { currentYear } from '../../utils/currentYear';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

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
          alert('Mensagem enviada');
          this.meuFormulario.reset();
        },
        error: (err) => {
          console.error(err);
          alert("Erro ao enviar.");
        }
      })
    } else {
      alert('Preencha todos os campos corretamente');
    }
  }

  anoAtual: number = currentYear();

}
